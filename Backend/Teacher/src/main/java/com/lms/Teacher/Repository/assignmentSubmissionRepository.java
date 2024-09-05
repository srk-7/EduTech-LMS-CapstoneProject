package com.lms.Teacher.Repository;

import com.lms.Teacher.entity.AssignmentSubmission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssignmentSubmissionRepository extends MongoRepository<AssignmentSubmission, String> {
    List<AssignmentSubmission> findByAssignmentId(String assignmentId);
}
