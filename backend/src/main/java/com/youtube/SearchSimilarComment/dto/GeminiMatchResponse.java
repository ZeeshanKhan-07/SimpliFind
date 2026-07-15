package com.youtube.SearchSimilarComment.dto;

import lombok.Data;

import java.util.List;

@Data
public class GeminiMatchResponse {

    private List<String> matchedIds;
}