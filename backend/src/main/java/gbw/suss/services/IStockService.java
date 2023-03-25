package gbw.suss.services;


import gbw.suss.models.Stock;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
interface IStockService {
    Stock getById(Long stockId);

    Stock saveNew(Stock stock);

    List<Stock> getAll();
}
