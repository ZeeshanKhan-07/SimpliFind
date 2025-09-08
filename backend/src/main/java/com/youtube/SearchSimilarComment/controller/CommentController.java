package com.youtube.SearchSimilarComment.controller;

import com.youtube.SearchSimilarComment.dto.CommentRequestDto;
import com.youtube.SearchSimilarComment.model.CommentResponse;
import com.youtube.SearchSimilarComment.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentService commentService;

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