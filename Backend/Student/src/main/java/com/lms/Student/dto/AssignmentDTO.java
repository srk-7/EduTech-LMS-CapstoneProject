package com.lms.Student.dto;

import com.lms.Student.model.Assignment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AssignmentDTO {
    public String name;
    public String classId;
    public List<Assignment> assignments;
}