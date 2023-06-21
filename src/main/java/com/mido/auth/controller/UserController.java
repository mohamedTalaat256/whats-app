package com.mido.auth.controller;


import com.mido.auth.utilis.AppResponse;
import com.mido.auth.entity.AppUser;
import com.mido.auth.services.UserService;
import com.mido.auth.utilis.Utils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<?> findAll(){

        return AppResponse.generateResponse("Success", HttpStatus.OK, userService.findAll(), true);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){

        return AppResponse.generateResponse("Success", HttpStatus.OK, userService.findById(id), true);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody  AppUser user){

        String imageName = user.getFullName();
        String image64 = user.getImage();

        user.setImage(Utils.saveImage(image64, imageName));
        userService.update(user);

        AppUser newUser = userService.findById(user.getId());

        return AppResponse.generateResponse("User Updated Successfully", HttpStatus.OK, newUser, true);
    }



    @GetMapping("/count")

    public ResponseEntity<Object> productCount(){
        return AppResponse.generateResponse("Success", HttpStatus.OK, userService.getUserCount(), true);
    }

}
