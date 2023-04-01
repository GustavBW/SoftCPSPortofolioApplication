package gbw.sls.repositories;

import gbw.sls.models.ChampionRotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionRotationRepository extends JpaRepository<ChampionRotation, Integer> {
}
