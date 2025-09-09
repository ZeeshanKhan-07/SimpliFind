package com.youtube.SearchSimilarComment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.youtube.SearchSimilarComment.dto.AuthResponse;
import com.youtube.SearchSimilarComment.dto.LoginRequest;
import com.youtube.SearchSimilarComment.dto.SignupRequest;
import com.youtube.SearchSimilarComment.entity.User;
import com.youtube.SearchSimilarComment.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    

    public AuthResponse signUp(SignupRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already exists with email : " + request.getEmail());
        }

        User user = new User(
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getFirstName(),
            request.getLastName()
        );

        user = userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(token, user.getEmail(), user.getFirstName(), user.getLastName());
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate user credentials using Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // Find user in database (we know they exist because authentication succeeded)
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generate JWT token for the authenticated user
        String token = jwtService.generateToken(user);
        
        // Return response with token and user details
        return new AuthResponse(token, user.getEmail(), user.getFirstName(), user.getLastName());
    }
}
