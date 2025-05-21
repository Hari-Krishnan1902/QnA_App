package com.example.QnA_App.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.QnA_App.entity.Answer;
import com.example.QnA_App.entity.AnswerRequestDTO;
import com.example.QnA_App.entity.Question;
import com.example.QnA_App.entity.User;
import com.example.QnA_App.respository.AnswerRepository;
import com.example.QnA_App.respository.QuestionRepository;
import com.example.QnA_App.respository.UserRepository;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    public Answer postAnswer(AnswerRequestDTO request) {
        Question question = questionRepository.findById(request.getQuestionId()).orElseThrow();
        User user =(User) userRepository.findByUsername(request.getUsername()).orElseThrow();
        Answer answer = new Answer(request.getContent(), question, user);
        return answerRepository.save(answer);
    }

    public List<Answer> getAnswersForQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        return answerRepository.findByQuestion(question);
    }
}

