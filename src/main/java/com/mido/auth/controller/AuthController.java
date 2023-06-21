package com.mido.auth.controller;

import com.mido.auth.DTO.*;
import com.mido.auth.entity.AppUser;
import com.mido.auth.entity.Role;
import com.mido.auth.repository.RoleRepo;
import com.mido.auth.repository.UserRepo;
import com.mido.auth.security.AuthService;
import com.mido.auth.services.UserService;
import com.mido.auth.utilis.AppResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;


    @Autowired
    RoleRepo roleRepo;

    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<Object> login (@RequestBody LoginRequestDto loginRequest){
        JWTResponseDto jwtResponseDto = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        //return AppResponse.generateResponse()  ;ResponseEntity.ok(jwtResponseDto);

        return AppResponse.generateResponse("login success", HttpStatus.OK, jwtResponseDto, true);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register (@RequestBody @Valid RegisterRequestDto registerRequest){

        AppUser user = new AppUser();
        user.setEmail(registerRequest.getEmail());
        user.setUserName(registerRequest.getUsername());
        user.setFullName(registerRequest.getFullName());
        user.setPassword(encoder.encode(registerRequest.getPassword()));

        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);

        userService.save(user);

        return AppResponse.generateResponse("register success", HttpStatus.OK, null, true);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AccessTokenDto> refreshAccessToken(@RequestParam String refreshToken) {
        AccessTokenDto dto = authService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String refreshToken) {
        authService.logoutUser(refreshToken);
        return ResponseEntity.ok(null);
    }

}