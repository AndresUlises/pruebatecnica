package org.fundacionjala.contacts.db.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.fundacionjala.contacts.models.Contact;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "contact")
@Table(name = "contact")
public class ContactData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String email;

    @ManyToMany
    private Set<MessageData> messages;

    public Contact toModel() {
        Contact contact = new Contact(name, email);
        contact.setId(id);
        contact.setUserId(userId);
        return contact;
    }


}
