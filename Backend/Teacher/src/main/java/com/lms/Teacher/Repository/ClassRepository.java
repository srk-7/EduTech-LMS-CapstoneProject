package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.Batch;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ClassRepository extends MongoRepository<Batch, String> {
    List<Batch> findByTeacherId(String teacherId);
}