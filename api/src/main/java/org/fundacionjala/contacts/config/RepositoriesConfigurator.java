package org.fundacionjala.contacts.config;

import org.fundacionjala.contacts.db.entities.UserData;
import org.fundacionjala.contacts.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = {"org.fundacionjala.contacts.db.entities"})
@EnableJpaRepositories(basePackages = {"org.fundacionjala.contacts.repository"})
public class RepositoriesConfigurator {

    @Bean
    public CommandLineRunner loadData(UserRepository repository) {
        return (args) -> {
            // save a couple of users
            repository.save(new UserData("Super Admin", "system123", "admin"));
        };
    }
}
