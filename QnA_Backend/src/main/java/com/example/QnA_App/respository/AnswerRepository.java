package com.example.QnA_App.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QnA_App.entity.Answer;
import com.example.QnA_App.entity.Question;

public interface AnswerRepository extends JpaRepository<Answer, Long>{
	  List<Answer> findByQuestion(Question question);
}
