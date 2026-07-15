package com.youtube.SearchSimilarComment.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.SearchSimilarComment.dto.GeminiMatchResponse;
import com.youtube.SearchSimilarComment.dto.SearchCommentRequest;
import com.youtube.SearchSimilarComment.model.Comment;
import com.youtube.SearchSimilarComment.model.CommentResponse;
import com.youtube.SearchSimilarComment.service.ChatService;
import com.youtube.SearchSimilarComment.service.CommentService;
import com.youtube.SearchSimilarComment.service.GeminiService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class ChatController {

    // private final ChatService chatService;
    private final GeminiService geminiService;

    private final CommentService commentService;
    // @PostMapping("/ask")
    // public ResponseEntity<?> askQuestion(@RequestBody Map<String, String>
    // payload) {
    // try {
    // String question = payload.get("question"); // Changed to lowercase for
    // consistency

    // if (question == null || question.trim().isEmpty()) {
    // return ResponseEntity.badRequest()
    // .body(Map.of("error", "Question is required"));
    // }

    // log.info("Received question: {}", question);
    // String answer = chatService.getAnswer(question);

    // return ResponseEntity.ok(Map.of(
    // "answer", answer,
    // "status", "success"
    // ));

    // } catch (Exception e) {
    // log.error("Error processing chat request", e);
    // return ResponseEntity.internalServerError()
    // .body(Map.of("error", "Internal server error"));
    // }
    // }

    @GetMapping("/ask")
    public String askGeminiAPI(@RequestBody String prompt) {
        return geminiService.askGemini(prompt);
    }

    @PostMapping("/search-comments")
    public ResponseEntity<CommentResponse> searchComments(
            @RequestBody SearchCommentRequest request) {

        CommentResponse allComments = commentService.fetchAllComments(
                request.getVideoId());

        GeminiMatchResponse geminiResponse = geminiService.findMatchingComments(
                request.getQuery(),
                allComments.getComments());

        Set<String> matchedIds = geminiResponse.getMatchedIds()
                .stream()
                .collect(Collectors.toSet());

        List<Comment> filteredComments = allComments.getComments()
                .stream()
                .filter(comment -> matchedIds.contains(comment.getId()))
                .toList();

        return ResponseEntity.ok(
                CommentResponse.builder()
                        .comments(filteredComments)
                        .totalCount(filteredComments.size())
                        .videoId(allComments.getVideoId())
                        .videoTitle(allComments.getVideoTitle())
                        .nextPageToken(null)
                        .build());
    }

}