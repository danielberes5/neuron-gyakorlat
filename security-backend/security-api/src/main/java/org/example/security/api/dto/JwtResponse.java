package org.example.security.api.dto;

import lombok.Data;
import lombok.Getter;

@Getter
public class JwtResponse {
    private final String token;

    public JwtResponse(String token) {
        this.token = token;
    }
}
