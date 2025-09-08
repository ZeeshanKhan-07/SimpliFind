package com.youtube.SearchSimilarComment.service;

import com.youtube.SearchSimilarComment.dto.CommentRequestDto;
import com.youtube.SearchSimilarComment.model.CommentResponse;

public interface CommentService {
    CommentResponse fetchComments(CommentRequestDto request);
    CommentResponse fetchAllComments(String videoId); // New method for all comments
}