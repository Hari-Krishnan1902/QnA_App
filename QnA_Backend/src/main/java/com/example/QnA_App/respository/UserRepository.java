package com.example.QnA_App.respository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QnA_App.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
		Optional<User> findByUsername(String username); 

		User findByUsernameAndPassword(String username, String password);

}
