package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "assignments")
public class Assignment {
    @Id
    private String assignmentId;
    private String classId;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime deadline;
    private String fileLink;
}