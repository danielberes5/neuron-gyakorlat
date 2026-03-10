package org.example.core.service;

import org.example.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService {

    User register(User user);

    User update(User user);

    Page<User> findAll(Pageable pageable);

    Optional<User> findByEmail(String email);
}