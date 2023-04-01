package gbw.sls.controllers;

import gbw.sls.BackendApplication;
import gbw.sls.models.ChampionInfo;
import gbw.sls.models.ChampionOverview;
import gbw.sls.models.ChampionStatblock;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChampionController {

    private static final String path = BackendApplication.API_VERSION + "/champions";

    @GetMapping(path=path+"/{key}")
    public ResponseEntity<ChampionOverview> getSingleChampOverview(@PathVariable long key)
    {
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
    }

    @GetMapping(path=path+"/current_rotation")
    public ResponseEntity<List<Integer>> getCurrentRotation()
    {
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
    }

    @GetMapping(path=path+"/{key}/stats")
    public ResponseEntity<ChampionStatblock> getChampionStatblock(@PathVariable long key)
    {
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
    }

    @GetMapping(path=path+"/{key}/info")
    public ResponseEntity<ChampionInfo> getChampionInfo(@PathVariable long key)
    {
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
    }
}
