package gbw.sls.request_util;

/**
 * Raw class used for loading data into the db
 */
public class RotationRequest {

    private int[] freeChampionIds;
    private int[] freeChampionIdsForNewPlayers;
    private int maxNewPlayerLevel;

    public int[] getFreeChampionIds() {
        return freeChampionIds;
    }

    public void setFreeChampionIds(int[] freeChampionIds) {
        this.freeChampionIds = freeChampionIds;
    }

    public int[] getFreeChampionIdsForNewPlayers() {
        return freeChampionIdsForNewPlayers;
    }

    public void setFreeChampionIdsForNewPlayers(int[] freeChampionIdsForNewPlayers) {
        this.freeChampionIdsForNewPlayers = freeChampionIdsForNewPlayers;
    }

    public int getMaxNewPlayerLevel() {
        return maxNewPlayerLevel;
    }

    public void setMaxNewPlayerLevel(int maxNewPlayerLevel) {
        this.maxNewPlayerLevel = maxNewPlayerLevel;
    }





}
