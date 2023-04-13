package gbw.sls.request_util;

import gbw.sls.models.ChampionOverview;

import java.util.List;

/**
 * Raw class used for loading data into the db
 */
public class ChampionListRequest {

    public String type, format, version;

    public ChampionOverview[] data;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public ChampionOverview[] getData() {
        return data;
    }

    public void setData(ChampionOverview[] data) {
        this.data = data;
    }
}
