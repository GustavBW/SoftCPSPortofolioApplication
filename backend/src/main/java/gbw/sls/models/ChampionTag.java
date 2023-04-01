package gbw.sls.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import org.hibernate.annotations.Table;

import java.util.Set;

@Entity
public class ChampionTag {

    @Id
    @Column(name = "value", nullable = false)
    private String value;

    public Set<ChampionOverview> getChampions() {
        return champions;
    }

    public void setChampions(Set<ChampionOverview> champions) {
        this.champions = champions;
    }

    @ManyToMany
    private Set<ChampionOverview> champions;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
