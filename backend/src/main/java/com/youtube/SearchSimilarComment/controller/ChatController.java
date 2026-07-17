package com.youtube.SearchSimilarComment.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.SearchSimilarComment.service.GeminiService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@AllArgsConstructor
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class ChatController {

        private final GeminiService geminiService;

        @GetMapping("/ask")
        public String askGeminiAPI(@RequestParam String prompt) {
                return geminiService.askGemini(prompt);
        }

}