package gbw.sls.cache_loader;

import gbw.sls.models.ChampionImageInfo;
import gbw.sls.models.ChampionOverview;
import gbw.sls.models.ChampionRotation;
import gbw.sls.models.ChampionTag;
import gbw.sls.repositories.*;
import gbw.sls.request_util.RotationRequest;
import gbw.sls.services.ISecretService;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class CacheLoader implements Runnable{

    private final ISecretService secrets;
    private final Thread thread;
    private final ChampionOverviewRepository champRepo;
    private final ChampionRotationRepository rotationRepo;
    private final ChampionTagRepository tagRepo;
    private final ChampionImageInfoRepository imageInfoRepo;
    private final ChampionStatblockRepository statsRepo;
    private final AtomicBoolean shouldRun = new AtomicBoolean(true);

    private static final String AUTH_HEADER_NAME = "Authorization";


    public CacheLoader(ChampionOverviewRepository champRepo,
                       ISecretService secrets,
                       ChampionRotationRepository rotationRepo,
                       ChampionTagRepository tagRepo,
                       ChampionImageInfoRepository imageInfoRepo,
                       ChampionStatblockRepository statsRepo
                       ){
        this.champRepo = champRepo;
        this.secrets = secrets;
        this.rotationRepo = rotationRepo;
        this.tagRepo = tagRepo;
        this.imageInfoRepo = imageInfoRepo;
        this.statsRepo = statsRepo;

        Runtime.getRuntime().addShutdownHook(new Thread(() -> shouldRun.set(false)));
        thread = new Thread(this);
        thread.start();
    }

    @Override
    public void run()
    {
        System.out.println("CacheLoader started");
        while(shouldRun.get()){

            try {
                loadAllChampions();
                updateCurrentRotation();
            } catch (JsonProcessingException e) {
                System.err.println(e.getMessage());
            }
            fillImageUrls();

            try {
                synchronized (this) {
                    wait(60 * 1000 * 60); //sleep 60 minutes
                }
            } catch (InterruptedException ignored) {}
        }
        System.out.println("CacheLoader stopped");
    }

    /**
     * Loads the current champion rotation into the database.
     * @throws JsonProcessingException
     */
    private void updateCurrentRotation() throws JsonProcessingException {
        String response = accumulateHttpRequest(CHAMP_ROTATION_URL,true);
        if(response != null) {
            RotationRequest request = new ObjectMapper().readValue(response, RotationRequest.class);
            ChampionRotation rotation = new ChampionRotation();
            rotation.setChampions(champRepo.findAllById(request.freeChampionIds));
            rotationRepo.save(rotation);
        }
    }

    /**
     * Generates the appropriate image urls based on RIOT api patterns.
     */
    private void fillImageUrls()
    {
        System.out.println("CacheLoader updating all champions");

        for(ChampionOverview overview : champRepo.findAll()){
            overview.setImageURL(getImageUrl(overview));
            overview.setThumbnailUrl(getChampionThumbnailUrl(overview));
        }
    }

    private String getChampionThumbnailUrl(ChampionOverview overview)
    {
        return "http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"+overview.getName()+"_0.jpg"; //public
    }
    private String getImageUrl(ChampionOverview overview){
        return "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+overview.getName()+"_0.jpg"; //public
    }

    /**
     * Loads the publicly available champion index
     * @throws JsonProcessingException
     */
    private void loadAllChampions() throws JsonProcessingException {
        System.out.println("CacheLoader updating all champions");

        String response = accumulateHttpRequest(ALL_CHAMPS_JSON_URL,false);

        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(response);
        JsonNode dataNode = root.path("data");

        List<ChampionOverview> dataList = new ArrayList<>();
        Iterator<JsonNode> elements = dataNode.elements();
        ObjectMapper mapper2 = new ObjectMapper();
        while (elements.hasNext()) {
            JsonNode element = elements.next();
            if(element != null)
                dataList.add(mapper2.treeToValue(element,ChampionOverview.class));
        }

        Set<ChampionTag> accumulatedTags = new HashSet<>(); //minor optimization as there's a lot of duplicates

        for(ChampionOverview champ : dataList) {
            accumulatedTags.addAll(champ.getTags());
        }
        tagRepo.saveAll(accumulatedTags);

        for(ChampionOverview champ : dataList) {
            ChampionImageInfo imageInfo = champ.getImage();
            if (imageInfo != null) {
                //imageInfo.setOverview(champ);
                imageInfo.setKey(champ.getKey());
                imageInfoRepo.save(imageInfo);
            }

            champ.getStats().setKey(champ.getKey());
            champ.getStats().setOverview(champ);
            statsRepo.save(champ.getStats());
        }
        champRepo.saveAll(dataList);
    }

    private String accumulateHttpRequest(String url, boolean includeAuth)
    {
        String response = null;
        try {
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Set the request method
            con.setRequestMethod("GET");

            // Set the X-Riot-Token header
            if(includeAuth)
                con.setRequestProperty("X-Riot-Token", secrets.getAuthToken());

            // Get the response code and read the response
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder responseAccumulator = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                responseAccumulator.append(inputLine);
            }
            in.close();

            response = responseAccumulator.toString();

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return response;
    }


    //load free rotation every 5 min
    //when loading champion.json load ChampionOverview.{name}_0.jpg as well for splash art

    //Auth header: X-Riot-Token

    //All champs: http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
    //Champ rotation: https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations
    //Champ thumbnail: https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg

    private static final String ALL_CHAMPS_JSON_URL = "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json"; //public
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg //public
    private static final String CHAMP_ROTATION_URL = "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations"; //private


}
