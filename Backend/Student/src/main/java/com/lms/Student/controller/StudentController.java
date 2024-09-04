package com.lms.Student.controller;

import com.lms.Student.dto.*;
import com.lms.Student.model.*;
import com.lms.Student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;


    // Endpoint to register a new student
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student registeredStudent = studentService.registerStudent(student);
        return ResponseEntity.ok(registeredStudent);
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }


    // Endpoint to get assignment details for a student
    @GetMapping("/{studentId}/sessions")
    public SessionsDTO getSessionsForStudent(@PathVariable String studentId) {
        return studentService.getSessionsForStudent(studentId);
    }

    // Endpoint to get session details for a student
    @GetMapping("/{studentId}/assignments")
    public AssignmentDTO getAssignmentsForStudent(@PathVariable String studentId) {
        return studentService.getAssignmentsForStudent(studentId);
    }

    // Endpoint to get material details for a student
    @GetMapping("/{studentId}/materials")
    public MaterialsDTO getMaterialsForStudent(@PathVariable String studentId) {
        return studentService.getMaterialsForStudent(studentId);
    }

    //Endpoint to get video details for a student
    @GetMapping("/{studentId}/videos")
    public VideosDTO getVideosForStudent(@PathVariable String studentId) {
        return studentService.getVideosForStudent(studentId);
    }

    @PostMapping("/{studentId}/assignments/{assignmentId}/submit")
    public ResponseEntity<AssignmentSubmission> submitAssignment(@PathVariable String studentId, @PathVariable String assignmentId, @RequestBody AssignmentSubmission submission) {
        submission.setStudentId(studentId);
        AssignmentSubmission returnedSubmission = studentService.submitAssignment(assignmentId, submission);
        return ResponseEntity.ok(returnedSubmission);
    }

    @GetMapping("/count/{classId}")
    public ResponseEntity<Long> getStudentCountByClassId(@PathVariable String classId) {
        Long count = studentService.countStudentsByClassId(classId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Student>> getStudentsByClassId(@PathVariable String classId) {
        List<Student> students = studentService.getStudentsByClassId(classId);
        return ResponseEntity.ok(students);
    }

    @PostMapping("/login")
    public ResponseEntity<StudentLoginResponseDTO> login(@RequestBody StudentLoginRequestDTO loginRequest) {
        Student student = studentService.login(loginRequest.getEmail(), loginRequest.getPassword());

        // Prepare the response with studentId and classId
        StudentLoginResponseDTO response = new StudentLoginResponseDTO();
        response.setStudentId(student.getStudentId());
        response.setClassId(student.getClassId());

        return ResponseEntity.ok(response);
    }

}
