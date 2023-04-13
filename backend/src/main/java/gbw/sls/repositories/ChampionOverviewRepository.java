package gbw.sls.repositories;

import gbw.sls.models.ChampionOverview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionOverviewRepository extends JpaRepository<ChampionOverview, Long> {
}
