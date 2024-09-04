package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "classes")
public class Batch {
    @Id
    private String classId;
    private String teacherId;
    private String className;
    private String description;
}