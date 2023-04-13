package gbw.sls.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Table;

@Entity
public class ChampionInfo {

    @Id
    @Column(nullable = false)
    private Long key;
    private int attack, defense, magic, difficulty;
    @OneToOne
    private ChampionOverview overview;

    public ChampionInfo(){}

    public ChampionOverview getOverview() {
        return overview;
    }

    public void setOverview(ChampionOverview overview) {
        this.overview = overview;
    }



    public int getAttack() {
        return attack;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }

    public int getDefense() {
        return defense;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

    public int getMagic() {
        return magic;
    }

    public void setMagic(int magic) {
        this.magic = magic;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }





    public Long getKey() {
        return key;
    }

    public void setKey(Long key) {
        this.key = key;
    }

}
