package gbw.sls.cache_loader;

import gbw.sls.BackendApplication;
import gbw.sls.repositories.IChampionRepository;
import gbw.sls.services.ISecretService;
import gbw.sls.services.SecretService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.concurrent.atomic.AtomicBoolean;

public class CacheLoader implements Runnable{

    private final ISecretService secrets;
    private final Thread thread;
    private final IChampionRepository champRepo;
    private final AtomicBoolean shouldRun = new AtomicBoolean(true);


    public CacheLoader(IChampionRepository champRepo, ISecretService secrets){
        this.champRepo = champRepo;
        this.secrets = secrets;

        Runtime.getRuntime().addShutdownHook(new Thread(() -> shouldRun.set(false)));
        thread = new Thread(this);
        thread.start();
    }

    @Override
    public void run()
    {
        System.out.println("CacheLoader started");
        while(shouldRun.get()){

            updateCurrenRotation();
            updateAllChampions();
            loadChampionSplashArts();

            try {
                wait(60 * 1000 * 60); //sleep 60 minutes
            } catch (InterruptedException ignored) {}
        }
        System.out.println("CacheLoader stopped");
    }

    private void loadChampionSplashArts() {
        System.out.println("CacheLoader loading champion splash art");
        //for each champion in db, load the corresponding default splash art
        //duely note that rate limiting means we can only fetch 20 images every second

    }

    private void updateCurrenRotation()
    {
        System.out.println("CacheLoader loading current rotation");

    }

    private void updateAllChampions()
    {
        System.out.println("CacheLoader updating all champions");

    }


    //load free rotation every 5 min
    //when loading champion.json load ChampionOverview.{name}_0.jpg as well for splash art

    //Auth header: X-Riot-Token
    //All champs: http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
    //Champ rotation: https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations


}
