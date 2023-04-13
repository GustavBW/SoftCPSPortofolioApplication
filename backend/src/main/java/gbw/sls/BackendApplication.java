package gbw.sls;

import gbw.sls.cache_loader.CacheLoader;
import gbw.sls.repositories.*;
import gbw.sls.services.ISecretService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@EntityScan(basePackages = "gbw.sls.models")
public class BackendApplication {

	public static final String API_VERSION = "/api/v1";
	private static CacheLoader cacheLoader;

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
		System.out.println("Backend online");
		cacheLoader = new CacheLoader(
				context.getBean(ChampionOverviewRepository.class),
				context.getBean(ISecretService.class),
				context.getBean(ChampionRotationRepository.class),
				context.getBean(ChampionTagRepository.class),
				context.getBean(ChampionImageInfoRepository.class),
				context.getBean(ChampionStatblockRepository.class)
		);
	}

}
