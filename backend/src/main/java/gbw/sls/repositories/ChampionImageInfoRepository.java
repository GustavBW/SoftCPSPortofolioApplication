package gbw.sls.repositories;

import gbw.sls.models.ChampionImageInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionImageInfoRepository extends JpaRepository<ChampionImageInfo,Long> {
}
