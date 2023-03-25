package gbw.suss;

import gbw.suss.controllers.StockController;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
		System.out.println("Backend online");
		context.getBean(StockController.class).reloadStocks();
	}

}
