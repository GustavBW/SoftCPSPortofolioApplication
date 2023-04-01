package gbw.sls.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Table;

import java.util.List;

@Entity
public class ChampionRotation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToMany
    private List<ChampionOverview> champions;

    public List<ChampionOverview> getChampions() {
        return champions;
    }

    public void setChampions(List<ChampionOverview> champions) {
        this.champions = champions;
    }

    public ChampionOverview getOverview() {
        return overview;
    }

    public void setOverview(ChampionOverview overview) {
        this.overview = overview;
    }

    @OneToOne(cascade = CascadeType.ALL,mappedBy="key")
    private ChampionOverview overview;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
