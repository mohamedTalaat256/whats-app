package com.mido.auth.controller;


import com.mido.auth.entity.Message;
import com.mido.auth.security.AuthEntryPointJwt;
import com.mido.auth.services.ChatService;
import com.mido.auth.utilis.AppResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chats")
@Transactional

public class ChatController {

    @Autowired
    private ChatService chatService;







    @GetMapping("/{userId}")
    public ResponseEntity<Object> findAllByUserId(@PathVariable Long userId){
        return AppResponse.generateResponse("Success", HttpStatus.OK, chatService.findAllByUserId(userId), true);
    }

    @PostMapping("/send")
    public ResponseEntity<Object> sendMessage(@RequestBody Message message){
        return AppResponse.generateResponse("Success", HttpStatus.OK, chatService.saveMessage(message), true);
    }


    @GetMapping("/chat_messages")
    public ResponseEntity<Object> chatMessages(@RequestParam Long userId, @RequestParam Long secondPersonId){
        return AppResponse.generateResponse("Success", HttpStatus.OK, chatService.getChatMessages(userId,secondPersonId), true);
    }



}
