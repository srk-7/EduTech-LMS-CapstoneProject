package com.lms.Student.client;

import com.lms.Student.model.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "Teacher", url = "http://localhost:8081/api/teachers")
public interface TeacherServiceFeignClient {

    @GetMapping("/classes/{classId}/sessions")
    List<Session> getSessionsByClassId(@PathVariable("classId") String classId);

    @GetMapping("/classes/{classId}/materials")
    List<Material> getMaterialsByClassId(@PathVariable("classId") String classId);

    @GetMapping("/classes/{classId}/videos")
    List<Video> getVideosByClassId(@PathVariable("classId") String classId);

    @GetMapping("/classes/{classId}/assignments")
    List<Assignment> getAssignmentsByClassId(@PathVariable("classId") String classId);

    @PostMapping("/assignments/{assignmentId}/submissions")
    AssignmentSubmission submitAssignment(@PathVariable("assignmentId") String assignmentId, @RequestBody AssignmentSubmission submission);

}
