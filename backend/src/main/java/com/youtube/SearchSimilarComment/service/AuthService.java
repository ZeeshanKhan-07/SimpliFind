package com.youtube.SearchSimilarComment.service;

import com.youtube.SearchSimilarComment.dto.UserDTO;
import com.youtube.SearchSimilarComment.dto.VerifyUserDTO;

public interface AuthService {
    UserDTO signup(UserDTO userDTO);
    
    void verifyUser(VerifyUserDTO input);

    void sendVerificationEmail(UserDTO user);

    void resendVerificationCode(String email);
    
    String generateVerificationCode();
}