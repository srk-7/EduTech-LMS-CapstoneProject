package com.lms.Teacher.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "materials")
public class Material {
    @Id
    private String materialId;
    private String classId;
    private String title;
    private String description;
    private String link;
}
