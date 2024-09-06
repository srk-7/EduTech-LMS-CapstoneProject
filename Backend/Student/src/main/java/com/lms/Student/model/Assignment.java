package com.lms.Student.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Assignment {
    private String assignmentId;
    private String classId;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime deadline;
    private String fileLink;
}