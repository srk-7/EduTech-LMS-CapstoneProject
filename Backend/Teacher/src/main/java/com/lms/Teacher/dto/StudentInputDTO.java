package com.lms.Teacher.dto;

public class StudentInputDTO {
    private String name;
    private String email;
    private String pwd;
    private String classId;

    // Constructors
    public StudentInputDTO() {}

    public StudentInputDTO(String name, String email, String pwd, String classId) {
        this.name = name;
        this.email = email;
        this.pwd = pwd;
        this.classId = classId;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }
}
