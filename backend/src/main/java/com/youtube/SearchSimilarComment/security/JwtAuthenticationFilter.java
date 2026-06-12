package com.youtube.SearchSimilarComment.security;

import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        logger.debug("Authorization Header: {}", header);

        if (header != null && header.startsWith("Bearer ")) {

            try {
                String token = header.substring(7);

                Claims claims = jwtService.parse(token);

                if (!"access".equals(claims.get("typ"))) {
                    filterChain.doFilter(request, response);
                    return;
                }

                String email = claims.get("email", String.class);

                if (email != null
                        && SecurityContextHolder.getContext().getAuthentication() == null) {

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.emptyList());

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }

            } catch (ExpiredJwtException e) {
                logger.error("JWT Token Expired");
                request.setAttribute("error", "Token expired");

            } catch (MalformedJwtException e) {
                logger.error("Malformed JWT Token");
                request.setAttribute("error", "Malformed token");

            } catch (JwtException e) {
                logger.error("Invalid JWT Token");
                request.setAttribute("error", "Invalid token");

            } catch (Exception e) {
                logger.error("Authentication Error", e);
                request.setAttribute("error", "Unexpected error occurred");
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();

        return path.startsWith("/api/v1/auth");
    }
}