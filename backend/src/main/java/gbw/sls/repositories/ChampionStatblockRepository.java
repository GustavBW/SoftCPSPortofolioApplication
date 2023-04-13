package gbw.sls.repositories;

import gbw.sls.models.ChampionStatblock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionStatblockRepository extends JpaRepository<ChampionStatblock,Long> {
}
