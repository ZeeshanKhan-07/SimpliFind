package com.youtube.SearchSimilarComment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SignupRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
