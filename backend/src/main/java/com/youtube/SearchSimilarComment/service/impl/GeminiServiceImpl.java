package com.youtube.SearchSimilarComment.service.impl;

import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.youtube.SearchSimilarComment.service.GeminiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GeminiServiceImpl implements GeminiService{

    private final Client client;
    @Override
    public String askGemini(String prompt) {
        GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", prompt, null);
        System.out.println("response: " + response.text());
        return response.text();
    }
    
}
