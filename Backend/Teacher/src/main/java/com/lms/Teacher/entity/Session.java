package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sessions")
public class Session
{
    @Id
    private String sessionId;
    private String classId;
    private String sessionName;
    private String sessionDate;
    private String sessionTime;
    private String sessionLink;
    private String description;
}