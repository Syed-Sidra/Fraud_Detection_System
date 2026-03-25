package com.frauddetection.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

public class AuthDto {

    @Data
    public static class LoginRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Data
    public static class RegisterRequest {
        @NotBlank
        private String username;
        @NotBlank
        @Size(min = 6)
        private String password;
        @Email @NotBlank
        private String email;
        private String role; // ADMIN or ANALYST
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String username;
        private String email;
        private String role;
        private Long userId;

        public AuthResponse(String token, String username, String email, String role, Long userId) {
            this.token = token;
            this.username = username;
            this.email = email;
            this.role = role;
            this.userId = userId;
        }
    }
}
