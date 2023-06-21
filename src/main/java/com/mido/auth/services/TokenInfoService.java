package com.mido.auth.services;
import java.util.Optional;

import com.mido.auth.entity.TokenInfo;
import com.mido.auth.repository.TokenInfoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class TokenInfoService {

    private final TokenInfoRepo tokenInfoRepo;

    public TokenInfo findById(Long id) {

        return tokenInfoRepo.findById(id).orElse(null);
    }

    public Optional<TokenInfo> findByRefreshToken(String refreshToken) {

        return tokenInfoRepo.findByRefreshToken(refreshToken);
    }

    public TokenInfo save(TokenInfo entity) {

        return tokenInfoRepo.save(entity);
    }

    public void deleteById (Long id) {

        tokenInfoRepo.deleteById(id);
    }
}