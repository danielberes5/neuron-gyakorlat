package org.example.security.core.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.security.core.entity.Role;
import org.example.security.core.entity.User;
import org.example.security.core.repository.RoleRepository;
import org.example.security.core.repository.UserRepository;
import org.example.security.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;


    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseThrow();
        user.getRoles().add(roleUser);
        return userRepository.save(user);
    }


    @Override
    public User update(Long id, User user) {
        User existing = userRepository.findById(id).orElseThrow();
        existing.setName(user.getName());
        existing.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(existing);
    }


    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}
