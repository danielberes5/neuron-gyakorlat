package org.example.gateway;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RequestLoggingGatewayFilter implements GatewayFilter, Ordered {

    private static final Logger log = LogManager.getLogger(RequestLoggingGatewayFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        long start = System.currentTimeMillis();

        String correlationId = UUID.randomUUID().toString();
        ThreadContext.put("correlationId", correlationId);

        String method = exchange.getRequest().getMethod().name();
        String path = exchange.getRequest().getURI().getPath();

        exchange.getResponse().getHeaders().add("X-Correlation-Id", correlationId);

        return chain.filter(exchange)
                .doFinally(signal -> {

                    long duration = System.currentTimeMillis() - start;
                    int status = exchange.getResponse().getStatusCode() != null
                            ? exchange.getResponse().getStatusCode().value()
                            : 200;

                    log.info(
                            "HTTP_REQUEST method={} path={} status={} duration={}ms correlationId={}",
                            method,
                            path,
                            status,
                            duration,
                            correlationId
                    );

                    ThreadContext.clearAll();
                });
    }

    @Override
    public int getOrder() {
        return -2;
    }
}