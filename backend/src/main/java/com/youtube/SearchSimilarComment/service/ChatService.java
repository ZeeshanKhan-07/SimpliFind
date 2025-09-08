package com.youtube.SearchSimilarComment.service;

import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ChatService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
                .build();
    }

    public String getAnswer(String question) {
        try {
            // Input validation
            if (question == null || question.trim().isEmpty()) {
                return "Please provide a valid question.";
            }

            // Construct the request payload
            Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                    Map.of("parts", new Object[] {
                        Map.of("text", question.trim())
                    })
                }
            );

            // Build full URL with API key
            String fullUrl = geminiApiUrl + "?key=" + geminiApiKey;

            // Make the API call with timeout
            String response = webClient.post()
                    .uri(fullUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .block();

            // Parse JSON response
            return parseGeminiResponse(response);

        } catch (WebClientResponseException e) {
            log.error("Gemini API error: Status={}, Body={}", e.getStatusCode(), e.getResponseBodyAsString());
            return "Sorry, I'm having trouble connecting to the AI service. Please try again.";
        } catch (Exception e) {
            log.error("Error while getting response from Gemini API", e);
            return "An unexpected error occurred. Please try again.";
        }
    }

    private String parseGeminiResponse(String response) throws Exception {
        JsonNode root = objectMapper.readTree(response);
        
        // Check if response has the expected structure
        JsonNode candidates = root.path("candidates");
        if (candidates.isEmpty()) {
            return "No response received from AI service.";
        }

        JsonNode textNode = candidates.get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text");

        if (textNode.isMissingNode()) {
            return "Invalid response format from AI service.";
        }

        String answer = textNode.asText();
        return answer.isEmpty() ? "No answer received." : answer;
    }
}