package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeacherRepository extends MongoRepository<Teacher, String> {
    Teacher findByEmail(String email);
}