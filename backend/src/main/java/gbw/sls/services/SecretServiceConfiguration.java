package gbw.sls.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecretServiceConfiguration {
    @Bean
    SecretService secretService(){
        return new SecretService();
    }
}
