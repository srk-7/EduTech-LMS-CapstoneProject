package com.lms.Teacher.response;


import com.lms.Teacher.entity.Teacher;

public class LoginResponse {

    private String token;
    private Teacher user;

    public LoginResponse(String token, Teacher user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Teacher getUser() {
        return user;
    }

    public void setUser(Teacher user) {
        this.user = user;
    }
}
