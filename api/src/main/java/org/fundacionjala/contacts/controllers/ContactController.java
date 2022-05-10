package org.fundacionjala.contacts.controllers;

import org.fundacionjala.contacts.exceptions.ContactNotFoundException;
import org.fundacionjala.contacts.exceptions.RequiredFieldException;
import org.fundacionjala.contacts.models.Contact;
import org.fundacionjala.contacts.repository.ContactRepository;
import org.fundacionjala.contacts.services.IContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContactController {

    private final ContactRepository contactRepository;

    private final IContactService service;

    public ContactController(ContactRepository contactRepository, IContactService service) {
        this.contactRepository = contactRepository;
        this.service = service;
    }

    @GetMapping("/contacts")
    public List<Contact> retrieveAllContacts(@RequestParam(required = false) String name) {
        return service.findAll(name);
    }

    @GetMapping("/contacts/{id}")
    public Contact retrieveContactById(@PathVariable Long id) throws ContactNotFoundException {
        return service.findById(id);
    }

    @PostMapping("/contacts")
    public Contact saveContact(@RequestBody Contact contact) throws RequiredFieldException {
        return service.save(contact);
    }
}
