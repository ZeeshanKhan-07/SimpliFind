package com.youtube.SearchSimilarComment.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.youtube.SearchSimilarComment.dto.GeminiMatchResponse;
import com.youtube.SearchSimilarComment.model.Comment;
import com.youtube.SearchSimilarComment.service.GeminiService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GeminiServiceImpl implements GeminiService {

        private final Client client;
        private final ObjectMapper objectMapper;

        @Override
        public String askGemini(String prompt) {

                int retries = 3;

                while (retries > 0) {

                        try {

                                GenerateContentResponse response = client.models.generateContent(
                                                "gemini-2.5-flash",
                                                prompt,
                                                null);

                                return response.text();

                        } catch (Exception e) {

                                retries--;

                                if (retries == 0) {
                                        throw e;
                                }

                                try {
                                        Thread.sleep(3000);
                                } catch (InterruptedException ignored) {
                                }
                        }
                }

                return "";
        }

        @Override
        public GeminiMatchResponse findMatchingComments(String query, List<Comment> comments) {
                try {

                        StringBuilder commentData = new StringBuilder();

                        for (Comment comment : comments) {

                                commentData.append("ID: ")
                                                .append(comment.getId())
                                                .append("\n");

                                commentData.append("TEXT: ")
                                                .append(comment.getTextOriginal())
                                                .append("\n\n");
                        }

                        String prompt = """
                                        User Query:
                                        %s

                                        Comments:
                                        %s

                                        Find comments that are semantically related
                                        to the user's query.

                                        Return ONLY valid JSON.

                                        Example:

                                        {
                                          "matchedIds": [
                                            "id1",
                                            "id2"
                                          ]
                                        }

                                        No markdown.
                                        No explanation.
                                        Only JSON.
                                        """
                                        .formatted(query, commentData);

                        String response = askGemini(prompt);

                        response = response
                                        .replace("```json", "")
                                        .replace("```", "")
                                        .trim();

                        return objectMapper.readValue(
                                        response,
                                        GeminiMatchResponse.class);

                } catch (Exception e) {
                        throw new RuntimeException(
                                        "Failed to process Gemini response",
                                        e);
                }
        }

}
