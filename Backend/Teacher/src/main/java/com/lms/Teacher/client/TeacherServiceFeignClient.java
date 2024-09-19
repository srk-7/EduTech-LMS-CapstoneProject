package com.lms.Teacher.client;

import com.lms.Teacher.entity.Student;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "Student", url = "http://localhost:8082/api/students")
public interface TeacherServiceFeignClient {

    @PostMapping("/register")
    Student registerStudent(@RequestBody Student student);

    @DeleteMapping("/deleteStudent/{studentId}")
    void deleteStudent(@PathVariable("studentId") String studentId);

}
