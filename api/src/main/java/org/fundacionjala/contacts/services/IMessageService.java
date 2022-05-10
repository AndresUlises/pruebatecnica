package org.fundacionjala.contacts.services;

import org.fundacionjala.contacts.models.Message;

import java.util.List;

public interface IMessageService {

    List<Message> findAllMessages();

    Message saveMessage(Message message);
}
