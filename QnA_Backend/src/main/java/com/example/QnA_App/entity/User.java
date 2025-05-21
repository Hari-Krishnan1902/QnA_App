package com.example.QnA_App.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "users") // avoid using "user" as it's a reserved SQL word
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public User orElse(Object object) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean isPresent() {
		// TODO Auto-generated method stub
		return false;
	}

	public User get() {
		// TODO Auto-generated method stub
		return null;
	}

	
}
