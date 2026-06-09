package com.youtube.SearchSimilarComment.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.youtube.SearchSimilarComment.dto.UserDTO;
import com.youtube.SearchSimilarComment.dto.VerifyUserDTO;
import com.youtube.SearchSimilarComment.entity.User;
import com.youtube.SearchSimilarComment.repository.UserRepository;
import com.youtube.SearchSimilarComment.service.AuthService;
import com.youtube.SearchSimilarComment.service.EmailService;
import com.youtube.SearchSimilarComment.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public UserDTO signup(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        String verificationCode = generateVerificationCode();
        userDTO.setVerificationCode(verificationCode);
        userDTO.setVerificationCodeExpiration(LocalDateTime.now().plusMinutes(15));
        userDTO.setEnable(false);
        UserDTO user = userService.createUser(userDTO);
        sendVerificationEmail(user);
        return user;
    }

    @Override
    public void verifyUser(VerifyUserDTO input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiration().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired. Please request a new one.");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnable(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiration(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code. Please try again.");
            }
        } else {
            throw new RuntimeException("User not found with given email id");
        }
    }

    @Override
    public void sendVerificationEmail(UserDTO user) {
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();

        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to SimpliFind</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnable()) {
                throw new RuntimeException("User is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiration(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(mapper.map(user, UserDTO.class));
            userRepository.save(user);
        }
    }

    @Override
    public String generateVerificationCode() {
        int code = (int) (Math.random() * 900000) + 100000;
        return String.valueOf(code);
    }

}
