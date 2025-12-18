package org.example.security.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank private final String name;
    @Email private final String email;
    @NotBlank private final String password;
}
