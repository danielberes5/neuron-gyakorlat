package org.example.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;
import org.example.api.dto.LoginRequest;
import org.example.api.dto.RegisterRequest;
import org.example.core.entity.User;
import org.example.core.service.UserService;
import org.example.api.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    private static final Logger log = LogManager.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setPassword(req.password());
        userService.register(user);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {

        log.info("AUTH_LOGIN_ATTEMPT email={}", req.email());

        Optional<User> user = userService.findByEmail(req.email());

        if (user.isEmpty() || !passwordEncoder.matches(req.password(), user.get().getPassword())) {

            log.warn("AUTH_LOGIN_FAILED email={}", req.email());

            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid credentials"));
        }

        ThreadContext.put("userId", String.valueOf(user.get().getId()));

        log.info("AUTH_LOGIN_SUCCESS email={}", req.email());

        String accessToken = jwtUtil.generateAccessToken(user.get());

        return ResponseEntity.ok(Map.of("accessToken", accessToken));
    }
}
