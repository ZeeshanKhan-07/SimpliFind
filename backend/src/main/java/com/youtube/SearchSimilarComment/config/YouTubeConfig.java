package com.youtube.SearchSimilarComment.config;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class YouTubeConfig {

    @Value("${youtube.api.key}")
    private String apiKey;

    @Value("${spring.application.name}")
    private String applicationName;

    @Bean
    public YouTube youTube() {
        log.info("Initializing YouTube API client with application name: {}", applicationName);
        
        return new YouTube.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance(),
                null)
                .setApplicationName(applicationName)
                .build();
    }
}