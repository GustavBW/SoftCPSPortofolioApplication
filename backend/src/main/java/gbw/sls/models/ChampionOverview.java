package gbw.sls.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Table;

import java.util.Set;

@Entity
public class ChampionOverview {
    @Id
    @Column(name = "key", nullable = false)
    private Long key;

    private String version, id; //version: latest patch update. id: same as name

    private String name, title, blurb; //name: champion name. title: some short flavourful descriptor. blurp: lore excerpt.

    @OneToOne(cascade=CascadeType.ALL,mappedBy="overview")
    private ChampionInfo info; //playstyle info
    private byte[] imageData; //raw image data

    @ManyToMany
    private Set<ChampionTag> tags; //fighter/assasin/mage/tank...
    private String parttype; //mana/fury/energy...

    @OneToOne(cascade=CascadeType.ALL,mappedBy="overview")
    private ChampionStatblock stats; //gameplay resource scores
    @OneToOne(cascade=CascadeType.ALL,mappedBy="overview")
    private ChampionImageInfo image; //gameplay image info

    public ChampionImageInfo getImage() {
        return image;
    }

    public void setImage(ChampionImageInfo image) {
        this.image = image;
    }

    public Long getKey() {
        return key;
    }

    public void setKey(Long key2) {
        this.key = key2;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public ChampionInfo getInfo() {
        return info;
    }

    public void setInfo(ChampionInfo info) {
        this.info = info;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] image) {
        this.imageData = image;
    }

    public Set<ChampionTag> getTags() {
        return tags;
    }

    public void setTags(Set<ChampionTag> tags) {
        this.tags = tags;
    }

    public String getParttype() {
        return parttype;
    }

    public void setParttype(String parttype) {
        this.parttype = parttype;
    }

    public ChampionStatblock getStats() {
        return stats;
    }

    public void setStats(ChampionStatblock stats) {
        this.stats = stats;
    }



}
