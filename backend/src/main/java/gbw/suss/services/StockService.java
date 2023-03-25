package gbw.suss.services;

import gbw.suss.models.Stock;
import gbw.suss.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StockService implements IStockService{

    @Autowired
    StockRepository repo;

    @Override
    public Stock getById(Long stockId) {
        return repo.findById(stockId).orElse(null);
    }

    @Override
    public Stock saveNew(Stock stock) {
        return repo.save(stock);
    }

    @Override
    public List<Stock> getAll() {
        return repo.findAll();
    }
}
