package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AssignmentSubmission {
    @Id
    private String id;
    private String studentId;
    private String studentName;
    private String assignmentId;
    private String assignmentName;
    private String submissionLink;
    private LocalDateTime submittedAt;
}
