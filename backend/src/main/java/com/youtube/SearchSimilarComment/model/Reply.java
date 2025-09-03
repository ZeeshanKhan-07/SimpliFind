package com.youtube.SearchSimilarComment.model;

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
public class Reply {
    
    private String id;
    
    @JsonProperty("text_display")
    private String textDisplay;
    
    @JsonProperty("text_original")
    private String textOriginal;
    
    @JsonProperty("like_count")
    private Long likeCount;
    
    @JsonProperty("published_at")
    private LocalDateTime publishedAt;
    
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
    
    private Author author;
    
    @JsonProperty("parent_id")
    private String parentId;
}