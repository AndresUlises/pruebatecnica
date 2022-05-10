package org.fundacionjala.contacts.repository;

import org.fundacionjala.contacts.db.entities.MessageData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageData, Long> {
}
