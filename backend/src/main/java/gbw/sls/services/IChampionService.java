package gbw.sls.services;

import gbw.sls.models.ChampionOverview;

import java.util.List;

public interface IChampionService {

    List<Integer> getCurrentRotation();
    ChampionOverview getChampion(long key);
}
