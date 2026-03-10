package org.example.api.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                // auth végpontok maradnak itt, nem továbbítjuk
                .route("auth", r -> r.path("/api/auth/**")
                        .uri("http://localhost:8080")) // vagy helyi endpoint, ha a gateway kezeli
                // users végpontok maradnak itt, nem továbbítjuk
                .route("users", r -> r.path("/api/users/**")
                        .uri("http://localhost:8080"))
                // minden más kérést továbbítunk a warehouse-backend felé
                .route("forward_all_others", r -> r.path("/**")
                        .uri("http://localhost:8081"))
                .build();
    }
}