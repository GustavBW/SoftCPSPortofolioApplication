package gbw.sls;

import gbw.sls.cache_loader.CacheLoader;
import gbw.sls.repositories.IChampionRepository;
import gbw.sls.services.ISecretService;
import gbw.sls.services.SecretService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BackendApplication {

	public static final String API_VERSION = "/api/v1";
	private static CacheLoader cacheLoader;

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
		System.out.println("Backend online");
		cacheLoader = new CacheLoader(context.getBean(IChampionRepository.class),context.getBean(ISecretService.class));
	}

}
