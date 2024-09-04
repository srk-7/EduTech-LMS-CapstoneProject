package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findByClassId(String classId);
}