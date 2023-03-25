package gbw.suss.request_util;

import gbw.suss.models.Stock;

import java.util.List;

//from: https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=ugpGi3g3Pj_f8_nKGsdS6mirQ16tLGUw
public class StocksResponse {

    public List<Stock> getResults() {
        return results;
    }

    public String getStatus() {
        return status;
    }

    public String getRequest_id() {
        return request_id;
    }

    public int getCount() {
        return count;
    }

    public String getNext_url() {
        return next_url;
    }

    private List<Stock> results;
    private String status;
    private String request_id;
    private int count;
    private String next_url;

}
