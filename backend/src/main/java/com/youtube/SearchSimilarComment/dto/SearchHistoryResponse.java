package com.youtube.SearchSimilarComment.dto;

import java.time.LocalDateTime;

public class SearchHistoryResponse {
    private Long id;
    private String videoUrl;
    private String videoId;
    private LocalDateTime searchedAt;
    
    public SearchHistoryResponse(Long id, String videoUrl, String videoId, LocalDateTime searchedAt) {
        this.id = id;
        this.videoUrl = videoUrl;
        this.videoId = videoId;
        this.searchedAt = searchedAt;
    }
    
    // Getters
    public Long getId() { return id; }
    public String getVideoUrl() { return videoUrl; }
    public String getVideoId() { return videoId; }
    public LocalDateTime getSearchedAt() { return searchedAt; }
}