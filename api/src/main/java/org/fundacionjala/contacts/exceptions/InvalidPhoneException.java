package org.fundacionjala.contacts.exceptions;

public class InvalidPhoneException extends Exception{
    public InvalidPhoneException(Integer number) {
        super("Phone: " + number + " is not a valid phone number");
    }
}
