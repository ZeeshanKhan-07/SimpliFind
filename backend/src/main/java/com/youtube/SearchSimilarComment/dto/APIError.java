package com.youtube.SearchSimilarComment.dto;

import java.time.OffsetDateTime;

public record APIError(
        int status,
        String error,
        String message,
        String path,
        OffsetDateTime timestamp) {
    public static APIError of(int status, String error, String message, String path) {
        return new APIError(status, error, message, path, OffsetDateTime.now());
    }
}