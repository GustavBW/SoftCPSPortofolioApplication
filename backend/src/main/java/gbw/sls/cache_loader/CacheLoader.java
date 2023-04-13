package gbw.sls.cache_loader;

<<<<<<< Updated upstream
import gbw.sls.models.ChampionOverview;
import gbw.sls.models.ChampionRotation;
import gbw.sls.repositories.ChampionRepository;
import gbw.sls.repositories.ChampionRotationRepository;
import gbw.sls.request_util.ChampionListRequest;
import gbw.sls.request_util.RotationRequest;
import gbw.sls.services.ISecretService;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
=======
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import gbw.sls.models.ChampionOverview;
import gbw.sls.repositories.IChampionRepository;
import gbw.sls.request_util.ChampionListRequest;
import gbw.sls.services.ISecretService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
>>>>>>> Stashed changes
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

import com.fasterxml.jackson.databind.ObjectMapper;

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

<<<<<<< Updated upstream

            RotationRequest currentRotation = updateCurrenRotation();
            updateAllChampions(currentRotation);
=======
            updateCurrentRotation();
            try {
                updateAllChampions();
            } catch (JsonProcessingException e) {
                System.out.println(e.getMessage());
            }
            loadChampionSplashArts();
>>>>>>> Stashed changes

            try {
                synchronized (this) {
                    wait(60 * 1000 * 60); //sleep 60 minutes
                }
            } catch (InterruptedException ignored) {}
        }
        System.out.println("CacheLoader stopped");
    }

    private void loadChampionSplashArts(ChampionOverview overview) {
        System.out.println("CacheLoader loading champion splash art");
        //for each champion in db, load the corresponding default splash art
        //duely note that rate limiting means we can only fetch 20 images every second
        //also thumbnail is needed. Meaning in terms of requests per second (henceforth r/s) this operation needs load about 10 overviews per second

        overview.setImageData(getChampionSplashArt(overview.getName()));
        overview.setThumbnailImageData(getChampionThumbnail(overview.getName()));
    }

<<<<<<< Updated upstream
    private RotationRequest updateCurrenRotation()
=======
    private void updateCurrentRotation()
>>>>>>> Stashed changes
    {
        System.out.println("CacheLoader loading current rotation");
        RotationRequest rotationRequest = new RotationRequest();
        try {
            URL obj = new URL("https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations");
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty(AUTH_HEADER_NAME, secrets.getAuthToken());

<<<<<<< Updated upstream
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = conn.getInputStream();
                String response = gatherStreamAsString(inputStream);
                ObjectMapper objectMapper = new ObjectMapper();
                rotationRequest = objectMapper.readValue(response, RotationRequest.class);
                inputStream.close();

            } else {
                System.out.println("Request failed with status code " + responseCode);
                return null;
            }
        }catch (IOException ignored){}

        return rotationRequest;
    }

    private void updateAllChampions(RotationRequest currentRotation)
    {
        System.out.println("CacheLoader updating all champions");

        for(ChampionOverview overview : getRawChampionOverviews()){
            if(currentRotation.getFreeChampionIds().contains(overview.getKey().intValue()))
            {
                loadChampionSplashArts(overview);
            }

        }


    }

    private byte[] getChampionThumbnail(String champName)
    {
        String url = "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/"+champName+"_0.jpg";
        byte[] asByteArray = new byte[0];

        try {
            URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty(AUTH_HEADER_NAME, secrets.getAuthToken());

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = conn.getInputStream();
                asByteArray = toByteArray(inputStream);
                inputStream.close();
            } else {
                System.out.println("Request failed with status code " + responseCode);
            }
        }catch (IOException ignored){
            System.err.println("Getting thumbnail for champion: " + champName + " failed");
        }
        return asByteArray;
    }

    private byte[] getChampionSplashArt(String champName)
    {
        String url = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+champName+"_0.jpg";
        byte[] asByteArray = new byte[0];

        try {
            URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty(AUTH_HEADER_NAME, secrets.getAuthToken());

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = conn.getInputStream();
                asByteArray = toByteArray(inputStream);
                inputStream.close();
            } else {
                System.out.println("Request failed with status code " + responseCode);
            }
        }catch (IOException ignored){
            System.err.println("Getting thumbnail for champion: " + champName + " failed");
        }
        return asByteArray;
    }

    public static byte[] toByteArray(InputStream inputStream) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[64*1000]; //according to some investigative journalism, the size seem to average 48KB
        int len;
        while ((len = inputStream.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, len);
        }
        return byteArrayOutputStream.toByteArray();
    }

    /**
     * Access' http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json
     * as a ChampionListRequest then returns the list of all champions contained within
     */
    public List<ChampionOverview> getRawChampionOverviews(){
        String url = "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json";
        List<ChampionOverview> list = new ArrayList<>();
        try {
            URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty(AUTH_HEADER_NAME, secrets.getAuthToken());
            int responseCode = conn.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = conn.getInputStream();
                String response = gatherStreamAsString(inputStream);
                ObjectMapper objectMapper = new ObjectMapper();
                list = (List<ChampionOverview>) objectMapper.readValue(response, ChampionListRequest.class);
                inputStream.close();
            } else {
                System.out.println("Gathering raw champion overviews failed with response code " + responseCode);
            }
        }catch (IOException ignored){} catch (Exception e) {
            e.printStackTrace();
        }


        return list;
    }


    private String gatherStreamAsString(InputStream stream)
    {
        StringBuilder stringBuilder = new StringBuilder();
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
            }
            bufferedReader.close();
        }catch (IOException ignored){

        }
        return stringBuilder.toString();
    }

    private ChampionListRequest parseChampionListJson(String json) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, ChampionListRequest.class);
=======
        String response = accumulateHttpRequest(CHAMP_ROTATION_URL,true);

    }

    private void updateAllChampions() throws JsonProcessingException {
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

        champRepo.saveAllAndFlush(dataList);
>>>>>>> Stashed changes
    }

    private String accumulateHttpRequest(String url, boolean includeAuth)
    {
        String response = "fetch failed";
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
<<<<<<< Updated upstream
    //All champs: http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
    //Champ rotation: https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations
    //Champ thumbnail: https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg
=======
    private static final String ALL_CHAMPS_JSON_URL = "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json"; //public
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg //public
    private static final String CHAMP_ROTATION_URL = "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations"; //private
>>>>>>> Stashed changes


}
