package com.mido.auth.services;


import com.mido.auth.entity.AppUser;
import com.mido.auth.entity.Role;
import com.mido.auth.exceptions.DuplicateRecordException;
import com.mido.auth.repository.UserRepo;
import com.mido.auth.security.AppUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;


    public List<AppUser> findAll (){

        return userRepo.findAll();
    }

    public AppUser findById (Long id){

        return userRepo.findById(id).orElse(null);
    }



    public AppUser save(AppUser entity){
        Optional<AppUser> user = findByEmail(entity.getEmail());
        if(user.isPresent()){
            throw new DuplicateRecordException("This Email is already exist");
        }else{
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
            return userRepo.save(entity);
        }
    }



    public AppUser update(AppUser entity) {
        AppUser currentUser = userRepo.findById(entity.getId()).orElse(null);
        currentUser.setFullName(entity.getFullName());
        currentUser.setEmail(entity.getEmail());

     //   if(entity.getImage().length() > 200){

            currentUser.setImage(entity.getImage());
            return userRepo.save(currentUser);
       // }



    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<AppUser> appUser =	userRepo.findByUserName(userName);

        if (!appUser.isPresent()) {

            throw new UsernameNotFoundException("This User Not found with selected user name :- " + userName);
        }

        return new AppUserDetail(appUser.get());
    }




    private Optional<AppUser> findByEmail(String email){
        //Optional<AppUser> findByUserEmail   = userRepo.findByUserEmail();
        return userRepo.findByEmail(email);

    }


    public Long getUserCount(){
        return userRepo.count();
    }

}