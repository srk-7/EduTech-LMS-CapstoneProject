package com.lms.Student.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {
    @Id
    private String studentId;
    private String name;
    private String email;
    private String pwd;
    private String role = "student";
    private String classId;
}
