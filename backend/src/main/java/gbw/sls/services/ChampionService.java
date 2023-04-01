package gbw.sls.services;

import gbw.sls.models.ChampionOverview;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampionService implements IChampionService{
    @Override
    public List<Integer> getCurrentRotation() {
        return null;
    }

    @Override
    public ChampionOverview getChampion(long key) {
        return null;
    }
}
