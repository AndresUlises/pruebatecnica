package org.fundacionjala.contacts.models;

import lombok.*;
import org.fundacionjala.contacts.db.entities.MessageData;
import org.fundacionjala.contacts.db.entities.UserData;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(of = {"id", "content"})
@ToString(of = {"id", "content"})
public class Message {

    private Long id;
    private Long userId;
    private String content;
    private Set<Long> contacts;

    public Message() {
        contacts = new HashSet<>();
    }

    public Message(String content, Set<Long> contacts) {
        this.contacts = contacts;
        this.content = content;
    }

    public MessageData toEntity() {
        return new MessageData(id, new UserData(), content);
    }
}
