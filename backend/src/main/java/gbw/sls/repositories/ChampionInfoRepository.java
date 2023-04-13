package gbw.sls.repositories;

import gbw.sls.models.ChampionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionInfoRepository extends JpaRepository<ChampionInfo,Long> {
}
