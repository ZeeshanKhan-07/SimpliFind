package com.youtube.SearchSimilarComment.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.SearchSimilarComment.dto.SearchHistoryResponse;
import com.youtube.SearchSimilarComment.dto.UserDTO;
import com.youtube.SearchSimilarComment.service.SearchHistoryService;
import com.youtube.SearchSimilarComment.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user-profile")
public class UserProfileController {

    private final UserService userService;
    private final SearchHistoryService searchHistoryService;

    @PutMapping("/update")
    public ResponseEntity<String> updateUserProfile(
            @RequestBody UserDTO userDTO,
            Authentication authentication) {

        String email = authentication.getName();

        userService.updateUserProfile(userDTO, email);

        return ResponseEntity.ok("User profile updated successfully");
    }

    @GetMapping
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getUserSearchHistory(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized access token.");
        }

        String email = authentication.getName();

        List<SearchHistoryResponse> history = searchHistoryService.getUserHistoryByEmail(email);

        return ResponseEntity.ok(history);
    }
}
