package com.mido.auth.exceptions;

public class DuplicateRecordException extends RuntimeException{
    public DuplicateRecordException() {
    }

    public DuplicateRecordException(String message) {
        super(message);
    }


}