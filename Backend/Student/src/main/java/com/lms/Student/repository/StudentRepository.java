package com.lms.Student.repository;

import com.lms.Student.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByEmail(String email);

    Long countByClassId(String classId);

    List<Student> findByClassId(String classId);
}
