package com.lms.Student.controller;

import com.lms.Student.dto.*;
import com.lms.Student.model.*;
import com.lms.Student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * Registers a new student.
     *
     * @param student the student information to register
     * @return the registered student
     */
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        try {
            Student registeredStudent = studentService.registerStudent(student);
            return ResponseEntity.ok(registeredStudent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    /**
     * Deletes a student by ID.
     *
     * @param studentId the ID of the student to delete
     * @return void (no content)
     */
    @DeleteMapping("/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId) {
        try {
            studentService.deleteStudent(studentId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Retrieves sessions for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return the list of sessions associated with the student
     */
    @GetMapping("/{studentId}/sessions")
    public ResponseEntity<SessionsDTO> getSessionsForStudent(@PathVariable String studentId) {
        try {
            SessionsDTO sessions = studentService.getSessionsForStudent(studentId);
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Retrieves assignment details for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return the assignment details for the student
     */
    @GetMapping("/{studentId}/assignments")
    public ResponseEntity<AssignmentDTO> getAssignmentsForStudent(@PathVariable String studentId) {
        try {
            AssignmentDTO assignments = studentService.getAssignmentsForStudent(studentId);
            return ResponseEntity.ok(assignments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Retrieves material details for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return the material details for the student
     */
    @GetMapping("/{studentId}/materials")
    public ResponseEntity<MaterialsDTO> getMaterialsForStudent(@PathVariable String studentId) {
        try {
            MaterialsDTO materials = studentService.getMaterialsForStudent(studentId);
            return ResponseEntity.ok(materials);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Retrieves video details for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return the video details for the student
     */
    @GetMapping("/{studentId}/videos")
    public ResponseEntity<VideosDTO> getVideosForStudent(@PathVariable String studentId) {
        try {
            VideosDTO videos = studentService.getVideosForStudent(studentId);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Submits an assignment for a student.
     *
     * @param studentId   the ID of the student
     * @param assignmentId the ID of the assignment
     * @param submission  the assignment submission details
     * @return the submitted assignment details
     */
    @PostMapping("/{studentId}/assignments/{assignmentId}/submit")
    public ResponseEntity<AssignmentSubmission> submitAssignment(@PathVariable String studentId,
                                                                 @PathVariable String assignmentId,
                                                                 @RequestBody AssignmentSubmission submission) {
        try {
            submission.setStudentId(studentId);
            AssignmentSubmission returnedSubmission = studentService.submitAssignment(assignmentId, submission);
            return ResponseEntity.ok(returnedSubmission);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Gets the count of students in a class by class ID.
     *
     * @param classId the ID of the class
     * @return the count of students in the class
     */
    @GetMapping("/count/{classId}")
    public ResponseEntity<Long> getStudentCountByClassId(@PathVariable String classId) {
        try {
            Long count = studentService.countStudentsByClassId(classId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Retrieves students in a class by class ID.
     *
     * @param classId the ID of the class
     * @return the list of students in the class
     */
    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Student>> getStudentsByClassId(@PathVariable String classId) {
        try {
            List<Student> students = studentService.getStudentsByClassId(classId);
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Authenticates a student login.
     *
     * @param loginRequest the student login request
     * @return the login response containing student and class IDs
     */
    @PostMapping("/login")
    public ResponseEntity<StudentLoginResponseDTO> login(@RequestBody StudentLoginRequestDTO loginRequest) {
        try {
            Student student = studentService.login(loginRequest.getEmail(), loginRequest.getPassword());
            StudentLoginResponseDTO response = new StudentLoginResponseDTO();
            response.setStudentId(student.getStudentId());
            response.setClassId(student.getClassId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}