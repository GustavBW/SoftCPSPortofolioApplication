package gbw.sls.request_util;

import java.util.List;

/**
 * Raw class used for loading data into the db and for Jackson purposes
 */
public class RotationRequest {

    public List<Long> freeChampionIds;
    public List<Long>  freeChampionIdsForNewPlayers;
    public int maxNewPlayerLevel;

    public RotationRequest(){}

    public List<Long>  getFreeChampionIds() {
        return freeChampionIds;
    }

    public void setFreeChampionIds(List<Long>  freeChampionIds) {
        this.freeChampionIds = freeChampionIds;
    }

    public List<Long>  getFreeChampionIdsForNewPlayers() {
        return freeChampionIdsForNewPlayers;
    }

    public void setFreeChampionIdsForNewPlayers(List<Long>  freeChampionIdsForNewPlayers) {
        this.freeChampionIdsForNewPlayers = freeChampionIdsForNewPlayers;
    }

    public int getMaxNewPlayerLevel() {
        return maxNewPlayerLevel;
    }

    public void setMaxNewPlayerLevel(int maxNewPlayerLevel) {
        this.maxNewPlayerLevel = maxNewPlayerLevel;
    }





}
