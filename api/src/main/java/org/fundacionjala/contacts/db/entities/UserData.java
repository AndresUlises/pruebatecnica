package org.fundacionjala.contacts.db.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.fundacionjala.contacts.models.User;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
@Entity
@EqualsAndHashCode(of = {"id", "username", "password"})
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String fullName;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false, unique = true)
    private String username;

    private String temporalCode;

    public UserData(String fullName, String password, String username) {
        this.fullName = fullName;
        this.password = password;
        this.username = username;
    }

    public User toModel() {
        User user = new User(fullName, password, username);
        user.setId(id);
        user.setTemporalCode(temporalCode);
        return user;
    }
}
