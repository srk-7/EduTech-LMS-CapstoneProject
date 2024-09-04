package com.lms.Student.repository;

import com.lms.Student.model.StudentAssignment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StudentAssignmentRepository extends MongoRepository<StudentAssignment, String> {
    List<StudentAssignment> findByStudentId(String studentId);
}
