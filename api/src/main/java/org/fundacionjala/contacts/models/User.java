package org.fundacionjala.contacts.models;

import lombok.Getter;
import lombok.Setter;
import org.fundacionjala.contacts.db.entities.UserData;

import java.util.Objects;
import java.util.UUID;

@Setter
@Getter
public class User {

    private Long id;
    private String fullName;
    private String password;
    private String username;
    private String temporalCode;

    public User(String name, String password, String username) {
        this.fullName = name;
        this.password = password;
        this.username = username;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) return true;
        if (that == null || getClass() != that.getClass()) return false;
        User user = (User) that;
        return Objects.equals(id, user.id) &&
               Objects.equals(fullName, user.fullName) &&
               Objects.equals(username, user.username) &&
               Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fullName, password, username);
    }

    public UserData toEntity() {
        UserData user = new UserData();
        user.setUsername(username);
        user.setFullName(fullName);
        user.setPassword(password);
        String uuid = temporalCode != null ? temporalCode : UUID.randomUUID().toString().substring(0, 6);
        user.setTemporalCode(uuid);
        user.setId(id);
        return user;
    }
}
