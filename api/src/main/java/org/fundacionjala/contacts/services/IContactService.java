package org.fundacionjala.contacts.services;

import org.fundacionjala.contacts.exceptions.RequiredFieldException;
import org.fundacionjala.contacts.models.Contact;

import java.util.List;

public interface IContactService {

    List<Contact> findAll(String name);

    Contact findById(Long id);

    Contact save(Contact contact) throws RequiredFieldException;
}
