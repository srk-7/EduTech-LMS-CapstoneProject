package com.lms.Student.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "student_assignments")
public class StudentAssignment {
    @Id
    private String submissionId;
    private String assignmentId; // ID of the assignment
    private String studentId; // ID of the student
    private String submissionLink; // Link to the submitted assignment
    private LocalDateTime submissionDate;
    private String status; // Status of the submission (e.g., submitted, graded)
}
