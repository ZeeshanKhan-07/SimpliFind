package com.youtube.SearchSimilarComment.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.SearchSimilarComment.service.ChatService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chat")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
@Slf4j
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/ask")
    public ResponseEntity<?> askQuestion(@RequestBody Map<String, String> payload) {
        try {
            String question = payload.get("question"); // Changed to lowercase for consistency
            
            if (question == null || question.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Question is required"));
            }

            log.info("Received question: {}", question);
            String answer = chatService.getAnswer(question);
            
            return ResponseEntity.ok(Map.of(
                "answer", answer,
                "status", "success"
            ));
            
        } catch (Exception e) {
            log.error("Error processing chat request", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Internal server error"));
        }
    }
}