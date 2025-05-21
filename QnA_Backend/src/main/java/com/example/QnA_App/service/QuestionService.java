package com.example.QnA_App.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.QnA_App.entity.Question;
import com.example.QnA_App.entity.QuestionResponseDTO;
import com.example.QnA_App.entity.User;
import com.example.QnA_App.respository.QuestionRepository;
import com.example.QnA_App.respository.UserRepository;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    public Question createQuestion(String title, String description, String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        
        if (user == null) {
            throw new RuntimeException("User with username '" + username + "' not found");
            // OR return null / custom error response based on your design
        }

        Question q = new Question(title, description, user); // ✅ user is guaranteed not null
        return questionRepository.save(q);
    }


    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }
    
    public List<QuestionResponseDTO> getAllQuestionDTOs() {
        List<Question> questions = questionRepository.findAll();
        
        return questions.stream()
            .map(q -> {
                String username = (q.getUser() != null) ? q.getUser().getUsername() : "Unknown"; // 🔒 Safe
                return new QuestionResponseDTO(
                    q.getId(),
                    q.getTitle(),
                    q.getDescription(),
                    username
                );
            })
            .collect(Collectors.toList());
    }

}
