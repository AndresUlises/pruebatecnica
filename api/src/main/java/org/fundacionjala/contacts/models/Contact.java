package org.fundacionjala.contacts.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.fundacionjala.contacts.db.entities.ContactData;

import java.util.HashSet;
import java.util.Objects;

@AllArgsConstructor
@Getter
@Setter
public class Contact {

    private Long id;
    private Long userId;
    private String name;
    private String email;
    private Integer phone;

    public Contact() {
    }

    public Contact(String name, String email, Integer phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) return true;
        if (that == null || getClass() != that.getClass()) return false;
        Contact contact = (Contact) that;
        return Objects.equals(id, contact.id) &&
                Objects.equals(userId, ((Contact) that).userId) &&
                Objects.equals(name, contact.name) &&
                Objects.equals(email, contact.email) &&
                Objects.equals(phone, contact.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, phone, userId);
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                '}';
    }


    public ContactData toEntity() {
        return new ContactData(id, 1L, name, email, phone, new HashSet<>());
    }
}