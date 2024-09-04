package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "videos")
public class Video {
    @Id
    private String videoId;
    private String classId;
    private String title;
    private String link;
    private String description;

}
