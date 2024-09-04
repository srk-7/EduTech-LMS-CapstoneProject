package com.lms.Student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class StudentLoginRequestDTO {
    private String email;
    private String password;
}
