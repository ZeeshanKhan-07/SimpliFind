package com.youtube.SearchSimilarComment.service.impl;
import com.google.api.services.youtube.YouTube;
import java.time.LocalDateTime;
import java.time.ZoneId;
import com.google.api.services.youtube.model.*;
import com.youtube.SearchSimilarComment.dto.CommentRequestDto;
import com.youtube.SearchSimilarComment.exception.InvalidRequestException;
import com.youtube.SearchSimilarComment.exception.YouTubeApiException;
import com.youtube.SearchSimilarComment.model.*;
import com.youtube.SearchSimilarComment.model.Comment;
import com.youtube.SearchSimilarComment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final YouTube youTube;

    @Value("${youtube.api.key}")
    private String apiKey;

    @Value("${youtube.api.max-results}")
    private Integer defaultMaxResults;

    @Override
    public CommentResponse fetchComments(CommentRequestDto request) {
        log.info("Starting to fetch comments for video ID: {}", request.getVideoId());
        
        try {
            validateRequest(request);
            
            // Fetch video details first
            String videoTitle = fetchVideoTitle(request.getVideoId());
            
            // Fetch comment threads
            CommentThreadListResponse response = fetchCommentThreads(request);
            
            List<Comment> comments = new ArrayList<>();
            
            if (response.getItems() != null) {
                log.debug("Processing {} comment threads", response.getItems().size());
                
                for (CommentThread thread : response.getItems()) {
                    Comment comment = mapCommentThread(thread, request.getVideoId());
                    comments.add(comment);
                }
            }

            log.info("Successfully fetched {} comments for video: {}", comments.size(), request.getVideoId());

            return CommentResponse.builder()
                    .comments(comments)
                    .totalCount(comments.size())
                    .nextPageToken(response.getNextPageToken())
                    .videoId(request.getVideoId())
                    .videoTitle(videoTitle)
                    .build();

        } catch (IOException e) {
            log.error("IO Exception occurred while fetching comments for video {}: {}", 
                     request.getVideoId(), e.getMessage(), e);
            throw new YouTubeApiException("Failed to fetch comments from YouTube API", 
                                        "API_CONNECTION_ERROR", 503, e);
        } catch (Exception e) {
            log.error("Unexpected error while fetching comments for video {}: {}", 
                     request.getVideoId(), e.getMessage(), e);
            throw new YouTubeApiException("Unexpected error occurred", 
                                        "UNKNOWN_ERROR", 500, e);
        }
    }

    private void validateRequest(CommentRequestDto request) {
        if (request.getVideoId() == null || request.getVideoId().trim().isEmpty()) {
            throw new InvalidRequestException("Video ID cannot be null or empty", "videoId");
        }
        
        if (request.getMaxResults() != null && (request.getMaxResults() < 1 || request.getMaxResults() > 100)) {
            throw new InvalidRequestException("Max results must be between 1 and 100", "maxResults");
        }
    }

    private String fetchVideoTitle(String videoId) {
        try {
            log.debug("Fetching video title for video ID: {}", videoId);
            
            YouTube.Videos.List videoRequest = youTube.videos()
                    .list(List.of("snippet"))  // Changed from "snippet" to List.of("snippet")
                    .setId(List.of(videoId))   // Changed from videoId to List.of(videoId)
                    .setKey(apiKey);

            VideoListResponse videoResponse = videoRequest.execute();
            
            if (videoResponse.getItems() != null && !videoResponse.getItems().isEmpty()) {
                String title = videoResponse.getItems().get(0).getSnippet().getTitle();
                log.debug("Video title found: {}", title);
                return title;
            }
            
            log.warn("No video found with ID: {}", videoId);
            return "Unknown Video";
            
        } catch (IOException e) {
            log.warn("Failed to fetch video title for {}: {}", videoId, e.getMessage());
            return "Unknown Video";
        }
    }

    private CommentThreadListResponse fetchCommentThreads(CommentRequestDto request) throws IOException {
        log.debug("Fetching comment threads with maxResults: {}, pageToken: {}", 
                 request.getMaxResults(), request.getPageToken());
        
        YouTube.CommentThreads.List commentRequest = youTube.commentThreads()
                .list(List.of("snippet", "replies"))  // Changed to List.of()
                .setVideoId(request.getVideoId())
                .setKey(apiKey)
                .setMaxResults((long) Optional.ofNullable(request.getMaxResults()).orElse(defaultMaxResults))
                .setOrder(Optional.ofNullable(request.getOrder()).orElse("relevance"));

        if (request.getPageToken() != null && !request.getPageToken().trim().isEmpty()) {
            commentRequest.setPageToken(request.getPageToken());
        }

        return commentRequest.execute();
    }

    private Comment mapCommentThread(CommentThread thread, String videoId) {
        CommentThreadSnippet snippet = thread.getSnippet();
        com.google.api.services.youtube.model.Comment topLevelComment = snippet.getTopLevelComment();
        CommentSnippet commentSnippet = topLevelComment.getSnippet();

        log.trace("Mapping comment with ID: {}", topLevelComment.getId());

        // Map replies
        List<Reply> replies = new ArrayList<>();
        if (thread.getReplies() != null && thread.getReplies().getComments() != null) {
            log.trace("Processing {} replies for comment {}", 
                     thread.getReplies().getComments().size(), topLevelComment.getId());
            
            for (com.google.api.services.youtube.model.Comment replyComment : thread.getReplies().getComments()) {
                Reply reply = mapReply(replyComment, topLevelComment.getId());
                replies.add(reply);
            }
        }

        return Comment.builder()
                .id(topLevelComment.getId())
                .textDisplay(commentSnippet.getTextDisplay())
                .textOriginal(commentSnippet.getTextOriginal())
                .likeCount(commentSnippet.getLikeCount())
                .replyCount(snippet.getTotalReplyCount())
                .publishedAt(parseDateTime(commentSnippet.getPublishedAt()))
                .updatedAt(parseDateTime(commentSnippet.getUpdatedAt()))
                .author(mapAuthor(commentSnippet))
                .replies(replies)
                .videoId(videoId)
                .build();
    }

    private LocalDateTime parseDateTime(com.google.api.client.util.DateTime dateTime) {
    if (dateTime == null) {
        return null;
    }
    
    try {
        return LocalDateTime.ofInstant(
                java.time.Instant.ofEpochMilli(dateTime.getValue()), 
                ZoneId.systemDefault());
    } catch (Exception e) {
        log.warn("Failed to parse datetime: {}", dateTime, e);
        return LocalDateTime.now();
    }
}
    private Reply mapReply(com.google.api.services.youtube.model.Comment replyComment, String parentId) {
        CommentSnippet snippet = replyComment.getSnippet();

        return Reply.builder()
                .id(replyComment.getId())
                .textDisplay(snippet.getTextDisplay())
                .textOriginal(snippet.getTextOriginal())
                .likeCount(snippet.getLikeCount())
                .publishedAt(parseDateTime(snippet.getPublishedAt()))
                .updatedAt(parseDateTime(snippet.getUpdatedAt()))
                .author(mapAuthor(snippet))
                .parentId(parentId)
                .build();
    }

    private Author mapAuthor(CommentSnippet snippet) {
        return Author.builder()
                .displayName(snippet.getAuthorDisplayName())
                .profileImageUrl(snippet.getAuthorProfileImageUrl())
                .channelUrl(snippet.getAuthorChannelUrl())
                .channelId(snippet.getAuthorChannelId() != null ? 
                          snippet.getAuthorChannelId().getValue() : null)
                .build();
    }

    @Override
    public CommentResponse fetchAllComments(String videoId) {
        log.info("Starting to fetch ALL comments for video ID: {}", videoId);
        
        List<Comment> allComments = new ArrayList<>();
        String nextPageToken = null;
        int pageCount = 0;
        int totalFetched = 0;
        
        try {
            String videoTitle = fetchVideoTitle(videoId);
            
            do {
                pageCount++;
                log.info("Fetching page {} for video: {}", pageCount, videoId);
                
                CommentRequestDto request = CommentRequestDto.builder()
                        .videoId(videoId)
                        .maxResults(100) // Maximum per request
                        .pageToken(nextPageToken)
                        .order("time")
                        .build();
                
                CommentThreadListResponse response = fetchCommentThreads(request);
                
                if (response.getItems() != null) {
                    for (CommentThread thread : response.getItems()) {
                        Comment comment = mapCommentThread(thread, videoId);
                        allComments.add(comment);
                    }
                    
                    totalFetched += response.getItems().size();
                    log.info("Page {} fetched {} comments. Total so far: {}", 
                            pageCount, response.getItems().size(), totalFetched);
                }
                
                nextPageToken = response.getNextPageToken();
                
                // Add small delay to respect API rate limits
                if (nextPageToken != null) {
                    try {
                        Thread.sleep(100); // 100ms delay between requests
                    } catch (InterruptedException e) {
                        log.warn("Sleep interrupted during pagination", e);
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
                
                // Safety check to prevent infinite loops
                if (pageCount > 500) {
                    log.warn("Reached maximum page limit (500) for video: {}", videoId);
                    break;
                }
                
            } while (nextPageToken != null && !nextPageToken.isEmpty());
            
            log.info("Successfully fetched ALL {} comments from {} pages for video: {}", 
                    totalFetched, pageCount, videoId);
            
            return CommentResponse.builder()
                    .comments(allComments)
                    .totalCount(allComments.size())
                    .nextPageToken(null) // No more pages
                    .videoId(videoId)
                    .videoTitle(videoTitle)
                    .build();
            
        } catch (IOException e) {
            log.error("IO Exception occurred while fetching all comments for video {}: {}", 
                     videoId, e.getMessage(), e);
            throw new YouTubeApiException("Failed to fetch all comments from YouTube API", 
                                        "API_CONNECTION_ERROR", 503, e);
        } catch (Exception e) {
            log.error("Unexpected error while fetching all comments for video {}: {}", 
                     videoId, e.getMessage(), e);
            throw new YouTubeApiException("Unexpected error occurred", 
                                        "UNKNOWN_ERROR", 500, e);
        }
    }
}