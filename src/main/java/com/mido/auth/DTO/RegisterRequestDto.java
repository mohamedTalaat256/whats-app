package com.mido.auth.DTO;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
public class RegisterRequestDto {

    private String username;
    private String email;
    private String fullName;
    private String password;
    private Set<String> role;
}