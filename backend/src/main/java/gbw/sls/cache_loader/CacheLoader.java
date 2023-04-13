package gbw.sls.cache_loader;

import gbw.sls.models.ChampionOverview;
import gbw.sls.models.ChampionRotation;
import gbw.sls.repositories.ChampionRepository;
import gbw.sls.repositories.ChampionRotationRepository;
import gbw.sls.services.ISecretService;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

public class CacheLoader implements Runnable{

    private final ISecretService secrets;
    private final Thread thread;
    private final ChampionRepository champRepo;
    private final ChampionRotationRepository rotationRepo;
    private final AtomicBoolean shouldRun = new AtomicBoolean(true);

    private static final String AUTH_HEADER_NAME = "Authorization";


    public CacheLoader(ChampionRepository champRepo, ISecretService secrets, ChampionRotationRepository rotationRepo){
        this.champRepo = champRepo;
        this.secrets = secrets;
        this.rotationRepo = rotationRepo;

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
                updateCurrentRotation();
                loadAllChampions();
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

    private void updateCurrentRotation() throws JsonProcessingException {
        String response = accumulateHttpRequest(CHAMP_ROTATION_URL,true);
        if(response != null) {
            ChampionRotation rotation = new ObjectMapper().readValue(response, ChampionRotation.class);
            rotationRepo.save(rotation);
        }
    }


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
        return "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"+overview.getName()+"_0.jpg";
    }

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

    private String getImageUrl(ChampionOverview overview){
        return "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+overview.getName()+"_0.jpg";
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
