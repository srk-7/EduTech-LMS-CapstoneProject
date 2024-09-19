package com.lms.Teacher.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    // Use this secure Base64-encoded secret key
    private final String secretKey = "4pP7cZ9XVlgWZ2aVUbKN1ZnTgLs5pZIsLmbbAqJrFiA=";

    // Method to generate JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))  // 1 day validity
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // You can also add a method to validate the token if needed
    public boolean validateToken(String token, String username) {
        String extractedUsername = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    // Method to check if the token has expired
    private boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
}