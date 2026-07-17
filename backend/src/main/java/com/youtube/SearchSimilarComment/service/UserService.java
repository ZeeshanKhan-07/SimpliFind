package com.youtube.SearchSimilarComment.service;

import com.youtube.SearchSimilarComment.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByEmail(String email);
    void updateUserProfile(UserDTO userDTO, String email);
}
