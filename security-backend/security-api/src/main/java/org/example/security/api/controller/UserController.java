package org.example.security.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.security.core.entity.User;
import org.example.security.core.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;


    @GetMapping
    public Page<User> list(@RequestParam(defaultValue = "0") int page) {
        return userService.findAll(PageRequest.of(page, 10));
    }


    @PostMapping
    public User create(@Valid @RequestBody User user) {
        return userService.register(user);
    }
}
