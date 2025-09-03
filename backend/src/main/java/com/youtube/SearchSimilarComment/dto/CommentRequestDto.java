package com.youtube.SearchSimilarComment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {
    
    @NotBlank(message = "Video ID cannot be blank")
    @Pattern(regexp = "^[a-zA-Z0-9_-]{11}$", message = "Invalid YouTube video ID format")
    @JsonProperty("video_id")
    private String videoId;
    
    @JsonProperty("max_results")
    private Integer maxResults;
    
    @JsonProperty("page_token")
    private String pageToken;
    
    @JsonProperty("order")
    private String order; // time, relevance
}