package gbw.sls.request_util;

import java.util.List;

/**
 * Raw class used for loading data into the db
 */
public class RotationRequest {

    private List<Integer> freeChampionIds;
    private List<Integer>  freeChampionIdsForNewPlayers;
    private int maxNewPlayerLevel;

    public List<Integer>  getFreeChampionIds() {
        return freeChampionIds;
    }

    public void setFreeChampionIds(List<Integer>  freeChampionIds) {
        this.freeChampionIds = freeChampionIds;
    }

    public List<Integer>  getFreeChampionIdsForNewPlayers() {
        return freeChampionIdsForNewPlayers;
    }

    public void setFreeChampionIdsForNewPlayers(List<Integer>  freeChampionIdsForNewPlayers) {
        this.freeChampionIdsForNewPlayers = freeChampionIdsForNewPlayers;
    }

    public int getMaxNewPlayerLevel() {
        return maxNewPlayerLevel;
    }

    public void setMaxNewPlayerLevel(int maxNewPlayerLevel) {
        this.maxNewPlayerLevel = maxNewPlayerLevel;
    }





}
