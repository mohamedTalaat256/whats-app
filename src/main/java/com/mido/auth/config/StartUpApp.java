package com.mido.auth.config;


import com.mido.auth.entity.AppUser;
import com.mido.auth.entity.Role;
import com.mido.auth.services.RoleService;
import com.mido.auth.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class StartUpApp implements CommandLineRunner {

    @Autowired

    private final UserService userService;
    @Autowired

    private final RoleService roleService;



    @Override
    public void run(String... args) throws Exception {
        if(roleService.findAll().isEmpty()){
            roleService.save(new Role(null, "admin"));
            roleService.save(new Role(null, "user"));
            roleService.save(new Role(null, "employee"));
        }


        /*
        u can make pulk insert using saveAll(List<Entity> entities);
        * */

       /*if (userService.findAll().isEmpty()){
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(roleService.findByName("admin"));

            Set<Role> userRoles = new HashSet<>();
            adminRoles.add(roleService.findByName("user"));

            Set<Role> employeeRoles = new HashSet<>();
            adminRoles.add(roleService.findByName("employee"));

           userService.save(new AppUser(null, "Nour Shaheen", "nour@gmail.com","nour", "123", adminRoles, true, true, true, true));

           userService.save(new AppUser(null, "Ali Mohamed",  "ali@gmail.com","ali", "123", userRoles, true, true, true, true));

           userService.save(new AppUser(null, "Ahmed Ebraheem", "ahmed@gmail.com", "ahmed", "123", employeeRoles, true, true, true, true));
        }*/
    }
}
