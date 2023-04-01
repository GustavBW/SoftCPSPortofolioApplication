package gbw.sls.cache_loader;

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


            RotationRequest currentRotation = updateCurrenRotation();
            updateAllChampions(currentRotation);

            try {
                wait(60 * 1000 * 60); //sleep 60 minutes
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

    private RotationRequest updateCurrenRotation()
    {
        System.out.println("CacheLoader loading current rotation");
        RotationRequest rotationRequest = new RotationRequest();
        try {
            URL obj = new URL("https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations");
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty(AUTH_HEADER_NAME, secrets.getAuthToken());

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
    }


    //load free rotation every 5 min
    //when loading champion.json load ChampionOverview.{name}_0.jpg as well for splash art

    //Auth header: X-Riot-Token
    //All champs: http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
    //Champ rotation: https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations
    //Champ thumbnail: https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg


}
