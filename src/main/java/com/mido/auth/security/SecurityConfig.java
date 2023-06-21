package com.mido.auth.security;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration

public class SecurityConfig {



    String [] PUBLIC_END_POINTS = {
            "/ws/**",
            "/media/**",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/auth/refresh-token",
            "/api/v1/auth/logout"};
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {

        http

                .cors(Customizer.withDefaults())
                .csrf(csrf-> csrf.disable())

                
                .exceptionHandling((ex)-> ex.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement((sm)-> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth-> auth.requestMatchers(PUBLIC_END_POINTS).permitAll())
//                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())

                .httpBasic(Customizer.withDefaults())
                .addFilterBefore(authFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("POST","GET","PUT","DELETE"));
        configuration.setAllowedHeaders(List.of("Content-Type", "Access-Control-Allow-Headers", "Origin",
                "x-requested-with", "Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }





    @Bean
    public AuthFilter authFilter() {
        return new AuthFilter();
    }


}
