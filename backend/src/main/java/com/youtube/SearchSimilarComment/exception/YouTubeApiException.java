package com.youtube.SearchSimilarComment.exception;

import lombok.Getter;

@Getter
public class YouTubeApiException extends RuntimeException {
    private final String errorCode;
    private final int httpStatus;

    public YouTubeApiException(String message, String errorCode, int httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }

    public YouTubeApiException(String message, String errorCode, int httpStatus, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
}