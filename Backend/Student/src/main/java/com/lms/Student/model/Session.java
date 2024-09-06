package com.lms.Student.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session
{
    private String sessionId;
    private String classId;
    private String sessionName;
    private String sessionDate;
    private String sessionTime;
    private String sessionLink;
    private String description;
}