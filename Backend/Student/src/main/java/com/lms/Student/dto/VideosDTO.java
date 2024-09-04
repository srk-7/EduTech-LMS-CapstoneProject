package com.lms.Student.dto;

import com.lms.Student.model.Session;
import com.lms.Student.model.Video;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class VideosDTO {
    public String name;
    public String classId;

    public List<Video> videos;
}
