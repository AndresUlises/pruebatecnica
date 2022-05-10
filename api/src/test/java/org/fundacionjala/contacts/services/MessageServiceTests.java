package org.fundacionjala.contacts.services;

import org.fundacionjala.contacts.db.entities.ContactData;
import org.fundacionjala.contacts.db.entities.MessageData;
import org.fundacionjala.contacts.db.entities.UserData;
import org.fundacionjala.contacts.models.Message;
import org.fundacionjala.contacts.repository.MessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTests {

    @Mock
    private MessageRepository repository;

    private IMessageService service;

    @BeforeEach
    public void setup() {
        service = new MessageService(repository);
    }

    @Test
    public void shouldListAllMessages() {
        // given
        UserData user = new UserData("Bart Simpson", "password", "bart");
        user.setId(1L);

        ContactData contactData = new ContactData(1L, user.getId(), "Lisa", "lisa@test.com", null);
        Set<ContactData> contacts = Collections.singleton(contactData);

        List<MessageData> messages = Arrays.asList(
                new MessageData(1L, user, "message content A", contacts),
                new MessageData(1L, user, "message content B", contacts),
                new MessageData(1L, user, "message content C", contacts)
        );

        List<Message> expected = messages
                .stream()
                .map(MessageData::toModel)
                .collect(Collectors.toList());

        // when when(mock.foo()).thenReturn("bar");
        when(repository.findAll())
                .thenReturn(messages);

        List<Message> actual = service.findAllMessages();

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    public void shouldSaveNewMessage() {
        // given
        UserData user = new UserData("Bart Simpson", "password", "bart");
        user.setId(1L);

        ContactData contactData = new ContactData(1L, user.getId(), "Lisa", "lisa@test.com", null);
        Set<ContactData> contacts = Collections.singleton(contactData);

        MessageData messageData = new MessageData(1L, user, "message content A", contacts);

        Message input = new Message("message content A", Collections.singleton(1L));
        input.setUserId(1L);

        Message expected = messageData.toModel();

        // when
        when(repository.save(any(MessageData.class)))
                .thenReturn(messageData);

        Message actual = service.saveMessage(input);

        // then
        assertThat(actual).isEqualTo(expected);
    }
}
