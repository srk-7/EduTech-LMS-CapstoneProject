package com.lms.Student.service;

import com.lms.Student.client.TeacherServiceFeignClient;
import com.lms.Student.dto.AssignmentDTO;
import com.lms.Student.dto.MaterialsDTO;
import com.lms.Student.dto.SessionsDTO;
import com.lms.Student.dto.VideosDTO;
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

    // Method to register a new student
    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    // Method to get session details by class ID
    public SessionsDTO getSessionsForStudent(String studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        SessionsDTO dto = new SessionsDTO();
        dto.setName(student.get().getName());
        dto.setClassId(student.get().getClassId());
        List<Session> sessions = teacherServiceFeignClient.getSessionsByClassId(dto.getClassId());
        dto.setSessions(sessions);
        return dto;
    }

    // Method to get materials details by class ID
    public MaterialsDTO getMaterialsForStudent(String studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        MaterialsDTO dto = new MaterialsDTO();
        dto.setName(student.get().getName());
        dto.setClassId(student.get().getClassId());
        List<Material> materials = teacherServiceFeignClient.getMaterialsByClassId(dto.getClassId());
        dto.setMaterials(materials);
        return dto;
    }

    // Method to get video details by class ID
    public VideosDTO getVideosForStudent(String studentId)
    {
        Optional<Student> student = studentRepository.findById(studentId);
        VideosDTO dto = new VideosDTO();
        dto.setName(student.get().getName());
        dto.setClassId(student.get().getClassId());
        List<Video> videos = teacherServiceFeignClient.getVideosByClassId(dto.getClassId());
        dto.setVideos(videos);
        return dto;
    }

    public AssignmentDTO getAssignmentsForStudent(String studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        AssignmentDTO dto = new AssignmentDTO();
        dto.setName(student.get().getName());
        dto.setClassId(student.get().getClassId());
        List<Assignment> assignment = teacherServiceFeignClient.getAssignmentsByClassId(dto.getClassId());
        dto.setAssignments(assignment);
        return dto;

    }

    public AssignmentSubmission submitAssignment(String assignmentId, AssignmentSubmission submission) {
        return teacherServiceFeignClient.submitAssignment(assignmentId, submission);
    }

    public Long countStudentsByClassId(String classId) {
        return studentRepository.countByClassId(classId);
    }

    public List<Student> getStudentsByClassId(String classId) {
        return studentRepository.findByClassId(classId);
    }

    public Student login(String email, String password) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getPwd().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return student;
    }

    public void deleteStudent(String studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            studentRepository.delete(studentOptional.get());
        } else {
            throw new RuntimeException("Student not found");
        }
    }

}
