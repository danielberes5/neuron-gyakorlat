package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

@ComponentScan(basePackages = "org.example")
@EnableJpaRepositories(basePackages = "org.example")
@EntityScan(basePackages = "org.example")
public class OrderAPIApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderAPIApplication.class, args);
    }

}