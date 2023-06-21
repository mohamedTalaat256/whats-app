package com.mido.auth.utilis;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Arrays;
import java.util.Map;

@Component
public class ResponseError extends DefaultErrorAttributes {


    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {

        Map<String, Object> resposeError = super.getErrorAttributes(webRequest, options);

        resposeError.put("success", Boolean.FALSE);
        resposeError.put("message", resposeError.get("error"));
        resposeError.put("status", resposeError.get("status"));
        resposeError.put("data", null);





        resposeError.remove("error");
        resposeError.remove("path");
        resposeError.remove("timestamp");
        return resposeError;
    }
}
