package com.mido.auth.exceptions;

public class RecordNotFoundException extends RuntimeException{
    public RecordNotFoundException() {
    }

    public RecordNotFoundException(String message) {
        super(message);
    }


}