package com.lms.Teacher.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherInputDTO {
    private String name;
    private String email;
    private String pwd;
}