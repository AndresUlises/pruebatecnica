package org.fundacionjala.contacts.repository;

import org.fundacionjala.contacts.db.entities.ContactData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<ContactData, Long> {

    Optional<ContactData> findByEmail(String email);

    List<ContactData> findByName(String name);
}
