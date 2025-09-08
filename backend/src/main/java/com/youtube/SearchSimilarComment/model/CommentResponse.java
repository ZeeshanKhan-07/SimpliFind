package com.youtube.SearchSimilarComment.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    
    private List<Comment> comments;
    
    @JsonProperty("total_count")
    private Integer totalCount;
    
    @JsonProperty("next_page_token")
    private String nextPageToken;
    
    @JsonProperty("video_id")
    private String videoId;
    
    @JsonProperty("video_title")
    private String videoTitle;
}