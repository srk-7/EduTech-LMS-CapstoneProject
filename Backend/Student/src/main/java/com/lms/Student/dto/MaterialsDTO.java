package com.lms.Student.dto;

import com.lms.Student.model.Material;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MaterialsDTO
{
    public String name;
    public String classId;
    public List<Material> materials;

}
