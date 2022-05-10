package org.fundacionjala.contacts.db.entities;

import lombok.*;
import org.fundacionjala.contacts.models.Message;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "message")
@Table(name = "messages")
@EqualsAndHashCode(of = {"id", "content"})
@ToString(of = {"id", "content"})
public class MessageData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserData user;

    @Column(nullable = false)
    private String content;

//    @OneToMany(
//            fetch = FetchType.EAGER,
//            mappedBy = "message",
//            cascade = {CascadeType.MERGE, CascadeType.PERSIST},
//            orphanRemoval = true
//    )
    @ManyToMany(mappedBy = "messages")
    private Set<ContactData> contacts;

    public MessageData(Long id, UserData user, String content) {
        this.id = id;
        this.user = user;
        this.content = content;
    }

    public Message toModel() {
        Set<Long> contactIds = contacts.stream()
                .map(ContactData::toModel)
                .map((c) -> { return c.getId(); })
                .collect(Collectors.toSet());
        return new Message(id, user.getId(), content, contactIds);
    }
}
