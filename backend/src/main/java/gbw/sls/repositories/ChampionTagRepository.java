package gbw.sls.repositories;

import gbw.sls.models.ChampionTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionTagRepository extends JpaRepository<ChampionTag,String> {
}
