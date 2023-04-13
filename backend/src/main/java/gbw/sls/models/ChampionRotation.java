package gbw.sls.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Table;

import java.util.List;

@Entity
public class ChampionRotation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @ManyToMany
    private List<ChampionOverview> champions;

    public ChampionRotation(){}

    public List<ChampionOverview> getChampions() {
        return champions;
    }

    public void setChampions(List<ChampionOverview> champions) {
        this.champions = champions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
