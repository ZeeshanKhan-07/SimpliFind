package com.youtube.SearchSimilarComment.service;

import java.util.List;

import com.youtube.SearchSimilarComment.dto.GeminiMatchResponse;
import com.youtube.SearchSimilarComment.model.Comment;

public interface GeminiService {
    String askGemini(String prompt);

    GeminiMatchResponse findMatchingComments(
            String query,
            List<Comment> comments);
}
