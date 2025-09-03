package com.youtube.SearchSimilarComment.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Author {
    
    @JsonProperty("display_name")
    private String displayName;
    
    @JsonProperty("profile_image_url")
    private String profileImageUrl;
    
    @JsonProperty("channel_url")
    private String channelUrl;
    
    @JsonProperty("channel_id")
    private String channelId;
}