package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    private String studentId;
    private String name;
    private String email;
    private String pwd;
    private String role = "student";
    private String classId;
    private String className;
}
