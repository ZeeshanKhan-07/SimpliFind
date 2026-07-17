package com.youtube.SearchSimilarComment.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.youtube.SearchSimilarComment.dto.SearchHistoryResponse;
import com.youtube.SearchSimilarComment.entity.SearchHistory;
import com.youtube.SearchSimilarComment.entity.User;
import com.youtube.SearchSimilarComment.repository.SearchHistoryRepository;
import com.youtube.SearchSimilarComment.repository.UserRepository;
import com.youtube.SearchSimilarComment.service.SearchHistoryService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SearchHistoryServiceImpl implements SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void saveSearchRecord(User user, String videoId, String query) {
        SearchHistory history = new SearchHistory();
        history.setUrl("https://www.youtube.com/watch?v=" + videoId);
        history.setDescription(query);
        history.setUser(user);
        searchHistoryRepository.save(history);
    }

    @Override
    public List<SearchHistoryResponse> getUserHistoryByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return Collections.emptyList();
        }

        return searchHistoryRepository.findByUserOrderByDateDesc(user).stream()
                .map(history -> SearchHistoryResponse.builder()
                        .id(history.getId())
                        .url(history.getUrl())
                        .description(history.getDescription())
                        .searchDate(history.getDate())
                        .build())
                .toList();
    }

}