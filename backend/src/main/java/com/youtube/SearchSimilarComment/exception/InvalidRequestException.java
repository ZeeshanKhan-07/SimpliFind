package com.youtube.SearchSimilarComment.exception;

import lombok.Getter;

@Getter
public class InvalidRequestException extends RuntimeException {
    private final String field;

    public InvalidRequestException(String message, String field) {
        super(message);
        this.field = field;
    }
}