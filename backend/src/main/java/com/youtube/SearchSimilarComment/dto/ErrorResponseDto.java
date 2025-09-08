package com.youtube.SearchSimilarComment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDto {
    
    @JsonProperty("error_code")
    private String errorCode;
    
    @JsonProperty("error_message")
    private String errorMessage;
    
    @JsonProperty("timestamp")
    private LocalDateTime timestamp;
    
    @JsonProperty("request_path")
    private String requestPath;
    
    @JsonProperty("details")
    private String details;
}