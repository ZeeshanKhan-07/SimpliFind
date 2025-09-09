package com.youtube.SearchSimilarComment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtube.SearchSimilarComment.entity.History;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserId(Long userId);
}
