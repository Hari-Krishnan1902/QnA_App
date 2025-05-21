package com.example.QnA_App.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QnA_App.entity.Question;
import com.example.QnA_App.entity.QuestionRequestDTO;
import com.example.QnA_App.entity.QuestionResponseDTO;
import com.example.QnA_App.service.QuestionService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/ask")
    public ResponseEntity<Question> askQuestion(@RequestBody QuestionRequestDTO request) {
        Question created = questionService.createQuestion(
            request.getTitle(),
            request.getDescription(),
            request.getUsername()
        );
        return ResponseEntity.ok(created);
    }
    

//    @GetMapping
//    public List<Question> getAllQuestions() {
//        return questionService.getAllQuestions();
//    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }
    
    @GetMapping
    public List<QuestionResponseDTO> getAllQuestions() {
        return questionService.getAllQuestionDTOs();
    }
}


