package com.lms.Teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class VideoInputDTO {
    private String title;
    private String description;
    private String link;
}