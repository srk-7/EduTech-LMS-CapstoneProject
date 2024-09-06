package com.lms.Student.dto;

import com.lms.Student.model.Session;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SessionsDTO {
    public String name;
    public String classId;
    public List<Session> sessions;

}