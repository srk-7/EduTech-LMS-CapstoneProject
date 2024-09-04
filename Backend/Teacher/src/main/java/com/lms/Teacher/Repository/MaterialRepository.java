package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.Material;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MaterialRepository extends MongoRepository<Material, String> {
    List<Material> findByClassId(String classId);
}