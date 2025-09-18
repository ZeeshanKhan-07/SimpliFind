package com.youtube.SearchSimilarComment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.youtube.SearchSimilarComment.entity.*;
import com.youtube.SearchSimilarComment.repository.*;
import com.youtube.SearchSimilarComment.dto.SearchHistoryResponse;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchHistoryService {
    
    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public void saveSearch(Long userId, String videoUrl, String videoId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        SearchHistory history = new SearchHistory();
        history.setUser(user);
        history.setVideoUrl(videoUrl);
        history.setVideoId(videoId);
        
        searchHistoryRepository.save(history);
    }
    
    public List<SearchHistoryResponse> getUserHistory(Long userId) {
        return searchHistoryRepository.findByUserIdOrderBySearchedAtDesc(userId)
            .stream()
            .map(h -> new SearchHistoryResponse(h.getId(), h.getVideoUrl(), 
                                              h.getVideoId(), h.getSearchedAt()))
            .collect(Collectors.toList());
    }
}