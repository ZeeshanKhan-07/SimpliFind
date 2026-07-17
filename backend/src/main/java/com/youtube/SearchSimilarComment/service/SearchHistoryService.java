package com.youtube.SearchSimilarComment.service;

import java.util.List;

import com.youtube.SearchSimilarComment.dto.SearchHistoryResponse;
import com.youtube.SearchSimilarComment.entity.User;

public interface SearchHistoryService {
    void saveSearchRecord(User user, String videoId, String query);
    List<SearchHistoryResponse> getUserHistoryByEmail(String email);
}
