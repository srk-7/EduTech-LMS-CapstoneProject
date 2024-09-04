package com.lms.Student.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    private String videoId;
    private String classId;
    private String title;
    private String link;
    private String description;
}
