package com.mido.auth.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sec_users")

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class AppUser {


    //for projection
    public AppUser(Long id, String fullName, String email, String userName, String image) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.userName = userName;
        this.image = image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;


    private String fullName;


    private String email;

    private String userName;


    private String password ;

    private String image ;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "sec_user_roles" ,
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @OrderColumn(name = "id")
    private Set<Role> roles = new HashSet<>();



    private boolean isEnabled;

    private boolean isCredentialsNonExpired;

    private boolean isAccountNonLocked;

    private boolean isAccountNonExpired;


    public AppUser(Long id) {
        super();
        this.id = id;
    }
}
