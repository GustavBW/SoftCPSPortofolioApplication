package gbw.suss.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StockServiceConfiguration {

    @Bean
    StockService stockService(){
        return new StockService();
    }
}
