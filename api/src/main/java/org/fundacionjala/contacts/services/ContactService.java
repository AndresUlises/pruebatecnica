package org.fundacionjala.contacts.services;

import org.fundacionjala.contacts.db.entities.ContactData;
import org.fundacionjala.contacts.exceptions.ContactNotFoundException;
import org.fundacionjala.contacts.exceptions.DuplicatedContactException;
import org.fundacionjala.contacts.exceptions.RequiredFieldException;
import org.fundacionjala.contacts.models.Contact;
import org.fundacionjala.contacts.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContactService implements IContactService {

    @Autowired
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public List<Contact> findAll(String name) {
        if (name == null || name.isEmpty()) {
            return contactRepository
                    .findAll()
                    .stream()
                    .map(ContactData::toModel)
                    .collect(Collectors.toList());
        }

        return contactRepository
                .findByName(name)
                .stream()
                .map(ContactData::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Contact findById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException("Unable to find contact with Id: " + id))
                .toModel();
    }

    @Override
    public Contact save(Contact contact) throws RequiredFieldException {
        validateContactFields(contact);
        return contactRepository
                .save(contact.toEntity())
                .toModel();
    }

    private void validateContactFields(Contact contact) throws RequiredFieldException {
        if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
            throw new RequiredFieldException("email");
        }

        if (contact.getName() == null || contact.getName().isEmpty()) {
            throw new RequiredFieldException("name");
        }

        if (contact.getPhone() == null) {
            throw new RequiredFieldException("phone");
        }

        if (contact.getPhone() < 9999999 || contact.getPhone() > 99999999) {
            throw new IllegalStateException("Number: " + contact.getPhone() + "is not a valid phone number");
        }

        Optional<ContactData> existingContact = contactRepository.findByEmail(contact.getEmail());

        if (existingContact.isPresent()) {
            throw new DuplicatedContactException("Unable to create contact due duplicated email: " + contact.getEmail());
        }
    }

    @Override
    public void deleteContact(Long contactId) {
        boolean exists = contactRepository.existsById(contactId);
        if (!exists) {
            throw new ContactNotFoundException("contact with id " + contactId + " does not exist");
        }
        contactRepository.deleteById(contactId);
    }
}
