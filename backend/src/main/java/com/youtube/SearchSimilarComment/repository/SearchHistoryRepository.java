package com.youtube.SearchSimilarComment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.youtube.SearchSimilarComment.entity.SearchHistory;
import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserIdOrderBySearchedAtDesc(Long userId);
}