package org.fundacionjala.contacts.controllers;

import org.fundacionjala.contacts.db.entities.UserData;
import org.fundacionjala.contacts.exceptions.InvalidConfirmationCode;
import org.fundacionjala.contacts.exceptions.InvalidCredentialsException;
import org.fundacionjala.contacts.exceptions.RequiredFieldException;
import org.fundacionjala.contacts.models.User;
import org.fundacionjala.contacts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository repository) {
        userRepository = repository;
    }

    @GetMapping("/users")
    public Set<User> retrieveAllUsers() {
        List<UserData> users = userRepository.findAll();

        return users
                .stream()
                .map(UserData::toModel)
                .collect(Collectors.toSet());
    }

    @GetMapping("/users/{code}")
    public User confirmUserCode(@PathVariable String code) throws InvalidConfirmationCode {
        List<UserData> user = userRepository.findByCode(code) ;
        if (user == null || user.isEmpty()) {
            throw new InvalidConfirmationCode("Invalid code confirmation: " + code);
        }
        return user.get(0).toModel();
    }

    @PostMapping("/users")
    public String saveUser(@RequestBody User user) throws RequiredFieldException {
        validateUserFields(user);
        User savedUser = userRepository.save(user.toEntity()).toModel();
        return savedUser.getTemporalCode();
    }

    @PostMapping("/sign-in")
    public User authenticateUser(@RequestBody User user) throws InvalidCredentialsException {
        List<UserData> validUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());

        if (validUser == null || validUser.isEmpty()) {
            throw new InvalidCredentialsException("Invalid Username or password for user '" + user.getFullName() + "'");
        }

        return validUser.get(0).toModel();
    }

    @PutMapping("/users")
    @CrossOrigin
    public User updateUser(@RequestBody User user) throws RequiredFieldException {
        validateUserFields(user);
        return userRepository.save(user.toEntity()).toModel();
    }

    private void validateUserFields(User user) throws RequiredFieldException {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new RequiredFieldException("username");
        }
    }
}
