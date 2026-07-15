package com.youtube.SearchSimilarComment.dto;

import lombok.Data;

@Data
public class SearchCommentRequest {

    private String videoId;
    private String query;
}