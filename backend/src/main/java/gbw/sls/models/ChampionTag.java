package gbw.sls.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import org.hibernate.annotations.Table;

import java.util.Set;

@Entity
public class ChampionTag implements Comparable<ChampionTag> {

    @Id
    @Column(nullable = false)
    public String value;

    public ChampionTag() {

    }

    @ManyToMany
    public Set<ChampionOverview> champions;

    public Set<ChampionOverview> getChampions() {
        return champions;
    }

    public void setChampions(Set<ChampionOverview> champions) {
        this.champions = champions;
    }


    public ChampionTag(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public int compareTo(ChampionTag o) {
        if(o.getValue().equals(this.value))
            return 1;
        return 0;
    }
}
