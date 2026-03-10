package org.example.api.controller;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class ClientLogController {

    private static final Logger log = LogManager.getLogger(ClientLogController.class);
    private static final Marker CLIENT = MarkerManager.getMarker("CLIENT");

    @PostMapping("/client")
    public ResponseEntity<?> logClientError(@RequestBody Map<String, Object> logData) {

        String level = logData.getOrDefault("level", "INFO").toString();
        String message = logData.getOrDefault("message", "").toString();
        String correlationId = logData.getOrDefault("correlationId", "n/a").toString();
        String url = logData.getOrDefault("url", "").toString();
        String method = logData.getOrDefault("method", "").toString();

        String logMsg = String.format(
                "CLIENT_LOG correlationId=%s method=%s url=%s message=%s",
                correlationId,
                method,
                url,
                message
        );

        switch (level.toUpperCase()) {

            case "ERROR":
                log.error(CLIENT, logMsg);
                break;

            case "WARN":
                log.warn(CLIENT, logMsg);
                break;

            default:
                log.info(CLIENT, logMsg);
        }

        return ResponseEntity.ok().build();
    }
}