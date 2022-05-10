package org.fundacionjala.contacts.exceptions;

public class RequiredFieldException extends Exception {
    public RequiredFieldException(String field) {
        super("Field '" + field + "' is required.");
    }
}
