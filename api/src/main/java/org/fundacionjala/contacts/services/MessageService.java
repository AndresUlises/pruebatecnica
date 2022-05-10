package org.fundacionjala.contacts.services;

import org.fundacionjala.contacts.db.entities.MessageData;
import org.fundacionjala.contacts.models.Message;
import org.fundacionjala.contacts.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService implements IMessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Message> findAllMessages() {
        return messageRepository
                .findAll()
                .stream()
                .map(MessageData::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Message saveMessage(Message message) {
        return messageRepository.save(message.toEntity()).toModel();
    }
}
