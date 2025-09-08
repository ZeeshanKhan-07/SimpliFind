package com.youtube.SearchSimilarComment.exception;

import com.youtube.SearchSimilarComment.dto.ErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(YouTubeApiException.class)
    public ResponseEntity<ErrorResponseDto> handleYouTubeApiException(
            YouTubeApiException ex, WebRequest request) {
        
        log.error("YouTube API Exception occurred: {} - Status: {}", ex.getMessage(), ex.getHttpStatus(), ex);
        
        ErrorResponseDto errorResponse = ErrorResponseDto.builder()
                .errorCode(ex.getErrorCode())
                .errorMessage(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .requestPath(request.getDescription(false))
                .details("YouTube API request failed")
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(ex.getHttpStatus()));
    }

    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ErrorResponseDto> handleInvalidRequestException(
            InvalidRequestException ex, WebRequest request) {
        
        log.error("Invalid request exception: {} - Field: {}", ex.getMessage(), ex.getField());
        
        ErrorResponseDto errorResponse = ErrorResponseDto.builder()
                .errorCode("INVALID_REQUEST")
                .errorMessage(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .requestPath(request.getDescription(false))
                .details("Field: " + ex.getField())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleValidationExceptions(
            MethodArgumentNotValidException ex, WebRequest request) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        log.error("Validation failed: {}", errors);

        ErrorResponseDto errorResponse = ErrorResponseDto.builder()
                .errorCode("VALIDATION_FAILED")
                .errorMessage("Request validation failed")
                .timestamp(LocalDateTime.now())
                .requestPath(request.getDescription(false))
                .details(errors.toString())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGenericException(
            Exception ex, WebRequest request) {
        
        log.error("Unexpected error occurred: {}", ex.getMessage(), ex);
        
        ErrorResponseDto errorResponse = ErrorResponseDto.builder()
                .errorCode("INTERNAL_SERVER_ERROR")
                .errorMessage("An unexpected error occurred")
                .timestamp(LocalDateTime.now())
                .requestPath(request.getDescription(false))
                .details(ex.getMessage())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}