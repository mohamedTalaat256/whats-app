package com.mido.auth.services;


import com.mido.auth.entity.AppUser;
import com.mido.auth.entity.Role;
import com.mido.auth.repository.RoleRepo;
import com.mido.auth.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepo roleRepo;

    public List<Role> findAll(){
        return roleRepo.findAll();
    }


    public Role findById(Long id){
        return roleRepo.findById(id).orElse(null);
    }

    public Role save(Role entity){
        return roleRepo.save(entity);
    }
}
