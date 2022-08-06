package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserService extends UserDetailsService {
    User getUser(Long id);
    User getUserByUsername(String username);
    List<User> showUser();

    Set<Role> getAllRole();

    void removeUser(Long id);



    void updateUser(User user, Set<Role> roles);
}

