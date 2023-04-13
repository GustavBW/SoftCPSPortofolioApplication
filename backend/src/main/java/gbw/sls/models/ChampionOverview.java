package gbw.sls.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class ChampionOverview {
    @Id
    @Column(nullable = false)
    public Long key;

    @OneToOne(optional = true)
    public ChampionImageInfo image; //gameplay image info

    public String version, id; //version: latest patch update. id: same as name

    public String name, title, blurb; //name: champion name. title: some short flavourful descriptor. blurp: lore excerpt.

    @OneToOne(optional = true)
    public ChampionInfo info; //playstyle info
    public String imageURL; //raw image data

    @ManyToMany
    public Set<ChampionTag> tags; //fighter/assasin/mage/tank...
    public String partype; //mana/fury/energy...

    @OneToOne(optional = true)
    public ChampionStatblock stats; //gameplay resource scores

    public String thumbnailUrl;

    public ChampionOverview(){}

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

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String image) {
        this.imageURL = image;
    }

    public Set<ChampionTag> getTags() {
        return tags;
    }

    public void setTags(Set<ChampionTag> tags) {
        this.tags = tags;
    }

    public String getPartype() {
        return partype;
    }

    public void setPartype(String partype) {
        this.partype = partype;
    }

    public ChampionStatblock getStats() {
        return stats;
    }

    public void setStats(ChampionStatblock stats) {
        this.stats = stats;
    }


    public void setThumbnailUrl(String championThumbnail) {
        this.thumbnailUrl = championThumbnail;
    }

    public String getThumbnailUrl(){
        return thumbnailUrl;
    }

}
