package com.youtube.SearchSimilarComment.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.youtube.SearchSimilarComment.dto.UserDTO;
import com.youtube.SearchSimilarComment.entity.User;
import com.youtube.SearchSimilarComment.exceptions.ResourceNotFoundException;
import com.youtube.SearchSimilarComment.repository.UserRepository;
import com.youtube.SearchSimilarComment.service.UserService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = modelMapper.map(userDTO, User.class);

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given email id "));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public void updateUserProfile(UserDTO userDTO, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        if (userDTO.getName() != null) {
            user.setName(userDTO.getName());
        }

        if (userDTO.getProfile_img() != null) {
            user.setProfile_img(userDTO.getProfile_img());
        }

        userRepository.save(user);
    }
}
