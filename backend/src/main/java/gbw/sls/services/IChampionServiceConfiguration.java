package gbw.sls.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IChampionServiceConfiguration {
    @Bean
    ChampionService userService(){
        return new ChampionService();
    }
}
