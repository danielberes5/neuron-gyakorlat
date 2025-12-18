package org.example.security.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "org.example.security")
@EnableJpaRepositories(basePackages = "org.example.security.core.repository")
@EntityScan(basePackages = "org.example.security.core.entity")
public class SecurityApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecurityApiApplication.class, args);
    }
}
