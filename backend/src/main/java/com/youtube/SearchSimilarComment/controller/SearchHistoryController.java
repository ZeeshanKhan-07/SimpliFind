package com.youtube.SearchSimilarComment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.youtube.SearchSimilarComment.service.SearchHistoryService;
import com.youtube.SearchSimilarComment.dto.SearchHistoryResponse;
import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:5537")
public class SearchHistoryController {
    
    @Autowired
    private SearchHistoryService searchHistoryService;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveSearch(@RequestParam Long userId, 
                                       @RequestParam String videoUrl, 
                                       @RequestParam String videoId) {
        try {
            searchHistoryService.saveSearch(userId, videoUrl, videoId);
            return ResponseEntity.ok("Search saved");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<SearchHistoryResponse>> getHistory(@PathVariable Long userId) {
        List<SearchHistoryResponse> history = searchHistoryService.getUserHistory(userId);
        return ResponseEntity.ok(history);
    }
}