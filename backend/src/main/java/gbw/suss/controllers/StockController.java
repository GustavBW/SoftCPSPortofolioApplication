package gbw.suss.controllers;

import gbw.suss.models.Stock;
import gbw.suss.request_util.StocksResponse;
import gbw.suss.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.Collections;
import java.util.List;

@RestController
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping("/stocks")
    public ResponseEntity<Stock> createStock(@RequestBody Stock stock)
    {
        if(stock == null)
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));

        Stock asSaved = stockService.saveNew(stock);
        return new ResponseEntity<>(asSaved, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/stocks")
    public ResponseEntity<List<Stock>> getStocks()
    {
        return new ResponseEntity<>(stockService.getAll(),HttpStatusCode.valueOf(200));
    }

    @GetMapping("/stocks/{id}")
    public ResponseEntity<Stock> getStock(@PathVariable Long id)
    {
        Stock found = stockService.getById(id);
        return new ResponseEntity<>(found, found == null ? HttpStatusCode.valueOf(400) : HttpStatusCode.valueOf(200));
    }


    /**
     * Loads the first 50 or so stocks into the db
     */
    public void reloadStocks()
    {
        //List<String> exchanges = fetch /v3/reference/exchanges
        //List<String> tickers = fetch https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=ugpGi3g3Pj_f8_nKGsdS6mirQ16tLGUw
        RestTemplate restTemplate = new RestTemplate();

        String uri = "https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=ugpGi3g3Pj_f8_nKGsdS6mirQ16tLGUw";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer ugpGi3g3Pj_f8_nKGsdS6mirQ16tLGUw");
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        ResponseEntity<StocksResponse> result = restTemplate.exchange(uri, HttpMethod.GET, entity, StocksResponse.class);

        if(result.getStatusCode() != HttpStatusCode.valueOf(200)){
            System.out.println("Stock Reload failed");
            return;
        }

        for(Stock stock : result.getBody().getResults())
        {
            stockService.saveNew(stock);
        }
    }

}
