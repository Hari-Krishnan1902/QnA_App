package com.example.QnA_App.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QnA_App.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	
}
