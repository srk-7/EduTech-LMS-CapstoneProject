package com.lms.Teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class AssignmentInputDTO {
    private String title;
    private String description;
    private LocalDateTime deadline;
    private String fileLink;

    // Getters and Setters
}
