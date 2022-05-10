package org.fundacionjala.contacts.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ContactExceptionsAdvice {

    @ResponseBody
    @ExceptionHandler(ContactNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String duplicatedContactHandler(ContactNotFoundException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(DuplicatedContactException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String duplicatedContactHandler(DuplicatedContactException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String invalidCredentialsHandler(InvalidCredentialsException exception) { return exception.getMessage(); }

    @ResponseBody
    @ExceptionHandler(RequiredFieldException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String requiredFieldHandler(RequiredFieldException exception) { return exception.getMessage(); }

    @ResponseBody
    @ExceptionHandler(InvalidConfirmationCode.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String invalidCodeConfirmationHandler(InvalidConfirmationCode exception) {
        return exception.getMessage();
    }
}
