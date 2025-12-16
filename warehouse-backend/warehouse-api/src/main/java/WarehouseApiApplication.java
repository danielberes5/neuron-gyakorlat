import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = "org.example.warehouse"
)
public class WarehouseApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(WarehouseApiApplication.class, args);
    }
}
