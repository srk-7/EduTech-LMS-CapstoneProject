package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AssignmentRepository extends MongoRepository<Assignment, String> {
    List<Assignment> findByClassId(String classId);
}