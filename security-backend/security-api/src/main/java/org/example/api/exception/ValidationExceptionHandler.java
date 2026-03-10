package org.example.api.exception;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.example.api.util.LogMaskingUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ValidationExceptionHandler {

    private static final Logger log = LogManager.getLogger(ValidationExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {

        Map<String,String> errors = new HashMap<>();

        for(FieldError error : ex.getBindingResult().getFieldErrors()){

            String field = error.getField();

            String maskedValue = LogMaskingUtil.mask(field,error.getRejectedValue());

            log.warn(
                    "VALIDATION_ERROR field={} rejectedValue={} message={}",
                    field,
                    maskedValue,
                    error.getDefaultMessage()
            );

            errors.put(field,error.getDefaultMessage());
        }

        return ResponseEntity
                .badRequest()
                .body(Map.of(
                        "message","Validation error",
                        "errors",errors
                ));
    }
}