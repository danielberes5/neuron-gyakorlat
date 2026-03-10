package org.example.api.controller;

import lombok.RequiredArgsConstructor;
import org.example.core.entity.User;
import org.example.core.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('BACKOFFICE')")
    public ResponseEntity<Page<User>> list(@RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(userService.findAll(PageRequest.of(page, 10)));
    }

    @PostMapping
    @PreAuthorize("hasRole('BACKOFFICE')")
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }
}
