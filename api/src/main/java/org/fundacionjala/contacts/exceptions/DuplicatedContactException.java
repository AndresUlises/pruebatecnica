package org.fundacionjala.contacts.exceptions;

public class DuplicatedContactException extends RuntimeException {
    public DuplicatedContactException(String message) {
        super(message);
    }
}
