package com.lms.Student.dto;

public class StudentDTO {
    private String name;
    private String email;
    private String className;

    // Constructors
    public StudentDTO() {}

    public StudentDTO(String name, String email, String className) {
        this.name = name;
        this.email = email;
        this.className = className;
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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
}
