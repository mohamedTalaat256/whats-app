package com.mido.auth.exceptions;


import com.mido.auth.utilis.AppResponse;
import com.mido.auth.utilis.ResponseError;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
        //عشان يعمل اكسبشن علي ال validation


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        List<String> errors = new ArrayList<String>();
        for(FieldError error : ex.getBindingResult().getFieldErrors()){
            errors.add(error.getDefaultMessage());
        }

        for(ObjectError error : ex.getBindingResult().getFieldErrors()){
            errors.add(error.getDefaultMessage());
        }

        return AppResponse.generateResponse(ex.toString(), HttpStatus.BAD_REQUEST, errors, false);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<?> handleDisabledException(DisabledException ex) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This Account is Disabled");
    }


    @ExceptionHandler(LockedException.class)
    public ResponseEntity<?> handleLockedException(LockedException ex) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This Account is Locked");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException ex) {

        return AppResponse.generateResponse("Bad Credentials", HttpStatus.UNAUTHORIZED, null, false) ;// ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials");
    }

    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<?> handleRecordNotFound(RecordNotFoundException ex){
        return AppResponse.generateResponse(ex.getMessage(),HttpStatus.NOT_FOUND, null, Boolean.FALSE);
    }


    @ExceptionHandler(DuplicateRecordException.class)
    public ResponseEntity<?> handleDuplicateRecord(DuplicateRecordException ex){
        return AppResponse.generateResponse(ex.getMessage(),HttpStatus.FOUND, null, Boolean.FALSE);
    }

    //add all your exceptions here
}
