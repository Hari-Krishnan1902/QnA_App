package com.example.QnA_App.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QnA_App.entity.Answer;
import com.example.QnA_App.entity.AnswerRequestDTO;
import com.example.QnA_App.service.AnswerService;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin(origins = "http://localhost:5173")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping("/post")
    public Answer postAnswer(@RequestBody AnswerRequestDTO request)  {
    	System.out.println("hari"+request.getContent()+request.getQuestionId()+request.getUsername());
        return answerService.postAnswer(request);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestion(@PathVariable Long questionId) {
        return answerService.getAnswersForQuestion(questionId);
    }
}
