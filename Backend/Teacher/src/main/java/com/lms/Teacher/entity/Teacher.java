package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "teachers")
public class Teacher {
    @Id
    private String teacherId;
    private String name;
    private String email;
    private String pwd;
    private String role = "teacher";

}