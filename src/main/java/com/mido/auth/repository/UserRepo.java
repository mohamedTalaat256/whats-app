package com.mido.auth.repository;


import com.mido.auth.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<AppUser, Long > {




    Optional<AppUser> findByUserName(String userName);

    Optional<AppUser> findByEmail(String email);

}
