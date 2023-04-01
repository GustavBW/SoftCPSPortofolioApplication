package gbw.sls.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Table;

@Entity
public class ChampionStatblock {
    @Id
    @Column(name = "key", nullable = false)
    private Long key;

    private float hp;
    private float hpperlevel;
    private float mp;
    private float mpperlevel;
    private float movespeed;
    private float armor;
    private float armorperlevel;
    private float spellblock;
    private float spellblockperlevel;
    private float attackrange;
    private float hpregen;
    private float hpregenperlevel;
    private float mpregen;
    private float mpregenperlevel;
    private float crit;
    private float critperlevel;
    private float attackdamage;
    private float attackdamageperlevel;
    private float attackspeedperlevel;
    private float attackspeed;

    public ChampionOverview getOverview() {
        return overview;
    }

    public void setOverview(ChampionOverview overview) {
        this.overview = overview;
    }

    @OneToOne(cascade = CascadeType.ALL,mappedBy="key")
    private ChampionOverview overview;

    public float getHp() {
        return hp;
    }

    public void setHp(float hp) {
        this.hp = hp;
    }

    public float getHpperlevel() {
        return hpperlevel;
    }

    public void setHpperlevel(float hpperlevel) {
        this.hpperlevel = hpperlevel;
    }

    public float getMp() {
        return mp;
    }

    public void setMp(float mp) {
        this.mp = mp;
    }

    public float getMpperlevel() {
        return mpperlevel;
    }

    public void setMpperlevel(float mpperlevel) {
        this.mpperlevel = mpperlevel;
    }

    public float getMovespeed() {
        return movespeed;
    }

    public void setMovespeed(float movespeed) {
        this.movespeed = movespeed;
    }

    public float getArmor() {
        return armor;
    }

    public void setArmor(float armor) {
        this.armor = armor;
    }

    public float getArmorperlevel() {
        return armorperlevel;
    }

    public void setArmorperlevel(float armorperlevel) {
        this.armorperlevel = armorperlevel;
    }

    public float getSpellblock() {
        return spellblock;
    }

    public void setSpellblock(float spellblock) {
        this.spellblock = spellblock;
    }

    public float getSpellblockperlevel() {
        return spellblockperlevel;
    }

    public void setSpellblockperlevel(float spellblockperlevel) {
        this.spellblockperlevel = spellblockperlevel;
    }

    public float getAttackrange() {
        return attackrange;
    }

    public void setAttackrange(float attackrange) {
        this.attackrange = attackrange;
    }

    public float getHpregen() {
        return hpregen;
    }

    public void setHpregen(float hpregen) {
        this.hpregen = hpregen;
    }

    public float getHpregenperlevel() {
        return hpregenperlevel;
    }

    public void setHpregenperlevel(float hpregenperlevel) {
        this.hpregenperlevel = hpregenperlevel;
    }

    public float getMpregen() {
        return mpregen;
    }

    public void setMpregen(float mpregen) {
        this.mpregen = mpregen;
    }

    public float getMpregenperlevel() {
        return mpregenperlevel;
    }

    public void setMpregenperlevel(float mpregenperlevel) {
        this.mpregenperlevel = mpregenperlevel;
    }

    public float getCrit() {
        return crit;
    }

    public void setCrit(float crit) {
        this.crit = crit;
    }

    public float getCritperlevel() {
        return critperlevel;
    }

    public void setCritperlevel(float critperlevel) {
        this.critperlevel = critperlevel;
    }

    public float getAttackdamage() {
        return attackdamage;
    }

    public void setAttackdamage(float attackdamage) {
        this.attackdamage = attackdamage;
    }

    public float getAttackdamageperlevel() {
        return attackdamageperlevel;
    }

    public void setAttackdamageperlevel(float attackdamageperlevel) {
        this.attackdamageperlevel = attackdamageperlevel;
    }

    public float getAttackspeedperlevel() {
        return attackspeedperlevel;
    }

    public void setAttackspeedperlevel(float attackspeedperlevel) {
        this.attackspeedperlevel = attackspeedperlevel;
    }

    public float getAttackspeed() {
        return attackspeed;
    }

    public void setAttackspeed(float attackspeed) {
        this.attackspeed = attackspeed;
    }



    public Long getKey() {
        return key;
    }

    public void setKey(Long key) {
        this.key = key;
    }
}
