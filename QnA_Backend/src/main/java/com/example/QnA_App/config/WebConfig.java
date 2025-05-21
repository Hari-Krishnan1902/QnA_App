package com.example.QnA_App.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all routes
            .allowedOrigins("http://localhost:5173") // Your React frontend origin
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow REST methods
            .allowedHeaders("*");
    }
}
