package com.lms.Student.service;

import com.lms.Student.client.TeacherServiceFeignClient;
import com.lms.Student.dto.*;
import com.lms.Student.model.*;
import com.lms.Student.repository.StudentRepository;
import com.lms.Student.repository.StudentAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentAssignmentRepository studentAssignmentRepository;

    @Autowired
    private TeacherServiceFeignClient teacherServiceFeignClient;

    /**
     * Registers a new student.
     *
     * @param student the student information to register
     * @return the registered student
     */
    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    /**
     * Retrieves session details for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return session details for the student's class
     */
    public SessionsDTO getSessionsForStudent(String studentId) {
        Student student = findStudentById(studentId);
        SessionsDTO dto = new SessionsDTO();
        dto.setName(student.getName());
        dto.setClassId(student.getClassId());
        List<Session> sessions = teacherServiceFeignClient.getSessionsByClassId(dto.getClassId());
        dto.setSessions(sessions);
        return dto;
    }

    /**
     * Retrieves materials for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return material details for the student's class
     */
    public MaterialsDTO getMaterialsForStudent(String studentId) {
        Student student = findStudentById(studentId);
        MaterialsDTO dto = new MaterialsDTO();
        dto.setName(student.getName());
        dto.setClassId(student.getClassId());
        List<Material> materials = teacherServiceFeignClient.getMaterialsByClassId(dto.getClassId());
        dto.setMaterials(materials);
        return dto;
    }

    /**
     * Retrieves video details for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return video details for the student's class
     */
    public VideosDTO getVideosForStudent(String studentId) {
        Student student = findStudentById(studentId);
        VideosDTO dto = new VideosDTO();
        dto.setName(student.getName());
        dto.setClassId(student.getClassId());
        List<Video> videos = teacherServiceFeignClient.getVideosByClassId(dto.getClassId());
        dto.setVideos(videos);
        return dto;
    }

    /**
     * Retrieves assignment details for a student by student ID.
     *
     * @param studentId the ID of the student
     * @return assignment details for the student's class
     */
    public AssignmentDTO getAssignmentsForStudent(String studentId) {
        Student student = findStudentById(studentId);
        AssignmentDTO dto = new AssignmentDTO();
        dto.setName(student.getName());
        dto.setClassId(student.getClassId());
        List<Assignment> assignments = teacherServiceFeignClient.getAssignmentsByClassId(dto.getClassId());
        dto.setAssignments(assignments);
        return dto;
    }

    /**
     * Submits an assignment for a student.
     *
     * @param assignmentId the ID of the assignment
     * @param submission   the submission details
     * @return the submitted assignment
     */
    public AssignmentSubmission submitAssignment(String assignmentId, AssignmentSubmission submission) {
        return teacherServiceFeignClient.submitAssignment(assignmentId, submission);
    }

    /**
     * Counts the number of students in a class by class ID.
     *
     * @param classId the ID of the class
     * @return the count of students in the class
     */
    public Long countStudentsByClassId(String classId) {
        return studentRepository.countByClassId(classId);
    }

    /**
     * Retrieves students in a class by class ID.
     *
     * @param classId the ID of the class
     * @return the list of students in the class
     */
    public List<Student> getStudentsByClassId(String classId) {
        return studentRepository.findByClassId(classId);
    }

    /**
     * Logs in a student by email and password.
     *
     * @param email    the student's email
     * @param password the student's password
     * @return the student details if login is successful
     */
    public Student login(String email, String password) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getPwd().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return student;
    }

    /**
     * Deletes a student by student ID.
     *
     * @param studentId the ID of the student to delete
     */
    public void deleteStudent(String studentId) {
        Student student = findStudentById(studentId);
        studentRepository.delete(student);
    }

    /**
     * Helper method to find a student by ID.
     *
     * @param studentId the ID of the student
     * @return the student object
     * @throws RuntimeException if the student is not found
     */
    private Student findStudentById(String studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
}
