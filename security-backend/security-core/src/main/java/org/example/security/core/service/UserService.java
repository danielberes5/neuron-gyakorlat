package org.example.security.core.service;

import org.example.security.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    User register(User user);
    User update(Long id, User user);
    Page<User> findAll(Pageable pageable);
}
