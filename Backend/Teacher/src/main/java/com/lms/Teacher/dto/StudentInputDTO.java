package com.lms.Teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class StudentInputDTO
{
    private String name;
    private String email;
    private String pwd;
    private String classId;
    private String className;
}
