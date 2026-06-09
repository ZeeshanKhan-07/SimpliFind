package com.youtube.SearchSimilarComment.dto;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.youtube.SearchSimilarComment.enums.Provider;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private UUID id;

    private String email;

    private String name;

    private String password;

    private String profile_img;

    private boolean enable = true;

    private Instant createdAt = Instant.now();

    private Instant updatedAt = Instant.now();

    private Provider provider = Provider.LOCAL;

    private String verificationCode;

    private LocalDateTime verificationCodeExpiration;

}
