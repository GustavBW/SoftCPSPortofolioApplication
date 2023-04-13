package gbw.sls.models;


import jakarta.persistence.*;

@Entity
@Table(name="champion_image_info")
public class ChampionImageInfo {
    @Id
    @Column(nullable = false)
    private Long key;

    @OneToOne(mappedBy="image")
    public ChampionOverview overview;

    public String full,sprite,group;
    public int x,y,w,h;

    public ChampionImageInfo(){}

    public Long getKey() {
        return key;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public String getFull() {
        return full;
    }

    public void setFull(String full) {
        this.full = full;
    }

    public String getSprite() {
        return sprite;
    }

    public void setSprite(String sprite) {
        this.sprite = sprite;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getW() {
        return w;
    }

    public void setW(int w) {
        this.w = w;
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }

    public ChampionOverview getOverview() {
        return overview;
    }

    public void setOverview(ChampionOverview overview) {
        this.overview = overview;
    }

}
