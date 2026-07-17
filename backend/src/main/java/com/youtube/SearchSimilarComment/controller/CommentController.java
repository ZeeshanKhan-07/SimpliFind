package com.youtube.SearchSimilarComment.controller;

import com.youtube.SearchSimilarComment.dto.CommentRequestDto;
import com.youtube.SearchSimilarComment.dto.GeminiMatchResponse;
import com.youtube.SearchSimilarComment.dto.SearchCommentRequest;
import com.youtube.SearchSimilarComment.entity.User;
import com.youtube.SearchSimilarComment.model.Comment;
import com.youtube.SearchSimilarComment.model.CommentResponse;
import com.youtube.SearchSimilarComment.repository.UserRepository;
import com.youtube.SearchSimilarComment.service.CommentService;
import com.youtube.SearchSimilarComment.service.GeminiService;
import com.youtube.SearchSimilarComment.service.SearchHistoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/youtube/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentService commentService;

    private final GeminiService geminiService;

    private final UserRepository userRepository;

    private final SearchHistoryService searchHistoryService;

    @PostMapping("/search-comments")
    public ResponseEntity<CommentResponse> searchComments(
            @RequestBody SearchCommentRequest request) {

        // 1. Process YouTube and Gemini steps
        CommentResponse allComments = commentService.fetchAllComments(request.getVideoId());
        GeminiMatchResponse geminiResponse = geminiService.findMatchingComments(request.getQuery(),
                allComments.getComments());
        Set<String> matchedIds = geminiResponse.getMatchedIds().stream().collect(Collectors.toSet());
        List<Comment> filteredComments = allComments.getComments().stream()
                .filter(comment -> matchedIds.contains(comment.getId())).toList();

        // 2. Safe User Resolution from Spring Security Context
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = null;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            email = (String) principal;
        }

        // 3. Save to history linked to this specific user profile
        if (email != null) {
            User currentUser = userRepository.findByEmail(email).orElse(null);
            if (currentUser != null) {
                searchHistoryService.saveSearchRecord(currentUser, request.getVideoId(),
                        request.getQuery());
            }
        }

        return ResponseEntity.ok(
                CommentResponse.builder()
                        .comments(filteredComments)
                        .totalCount(filteredComments.size())
                        .videoId(allComments.getVideoId())
                        .videoTitle(allComments.getVideoTitle())
                        .nextPageToken(null)
                        .build());
    }

    @GetMapping("/{videoId}/all")
    public ResponseEntity<CommentResponse> getAllComments(@PathVariable String videoId) {
        log.info("Received request to fetch ALL comments for video: {}", videoId);

        CommentResponse response = commentService.fetchAllComments(videoId);

        log.info("Returning ALL {} comments for video: {}", response.getTotalCount(), videoId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<CommentResponse> getComments(
            @PathVariable String videoId,
            @RequestParam(required = false) Integer maxResults,
            @RequestParam(required = false) String pageToken,
            @RequestParam(required = false, defaultValue = "relevance") String order) {

        log.info("Received request to fetch comments for video: {} with maxResults: {}",
                videoId, maxResults);

        CommentRequestDto request = CommentRequestDto.builder()
                .videoId(videoId)
                .maxResults(maxResults)
                .pageToken(pageToken)
                .order(order)
                .build();

        CommentResponse response = commentService.fetchComments(request);

        log.info("Returning {} comments for video: {}", response.getTotalCount(), videoId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CommentResponse> getCommentsPost(
            @Valid @RequestBody CommentRequestDto request) {

        log.info("Received POST request to fetch comments for video: {}", request.getVideoId());

        CommentResponse response = commentService.fetchComments(request);

        log.info("Returning {} comments for video: {}", response.getTotalCount(), request.getVideoId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        log.debug("Health check endpoint called");
        return ResponseEntity.ok("YouTube Comments Fetcher is running!");
    }
}