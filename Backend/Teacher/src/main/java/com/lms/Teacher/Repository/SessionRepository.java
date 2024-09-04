package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SessionRepository extends MongoRepository<Session, String> {
    List<Session> findByClassId(String classId);
}