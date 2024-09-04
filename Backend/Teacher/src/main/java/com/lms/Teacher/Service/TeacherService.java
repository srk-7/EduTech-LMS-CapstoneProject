package com.lms.Teacher.Service;

import com.lms.Teacher.client.TeacherServiceFeignClient;
import com.lms.Teacher.dto.StudentInputDTO;
import com.lms.Teacher.dto.TeacherInputDTO;
import com.lms.Teacher.entity.Assignment;
import com.lms.Teacher.entity.*;
import com.lms.Teacher.Repository.*;
import com.lms.Teacher.entity.Batch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private TeacherServiceFeignClient teacherServiceFeignClient;

    @Autowired
    private assignmentSubmissionRepository subrepo;

    @Autowired
    private JavaMailSender javaMailSender;

    private Instant LocalDateTime;


    //Teacher Creates her account
    public Teacher createTeacher(TeacherInputDTO teacher) {
        Teacher newTeacher = new Teacher();
        newTeacher.setName(teacher.getName());
        newTeacher.setEmail(teacher.getEmail());
        newTeacher.setPwd(teacher.getPwd());
        newTeacher.setRole("Teacher");
        teacherRepository.save(newTeacher);
        return newTeacher;
    }

    // Teacher Updates her account
    public Teacher updateTeacher(String teacherId, Teacher teacher)
    {
        Teacher existingTeacher = teacherRepository.findById(teacherId).orElse(null);
        if (existingTeacher!=null) {
            existingTeacher.setName(teacher.getName());
            existingTeacher.setEmail(teacher.getEmail());
            existingTeacher.setPwd(teacher.getPwd());
            return teacherRepository.save(existingTeacher);
        }
        return null;
    }

    //Teacher can remover her/his account using teacher id
    public Teacher deleteTeacher(String id){
        Teacher existingTeacher = teacherRepository.findById(id).orElse(null);
        if (existingTeacher!=null) {
            teacherRepository.delete(existingTeacher);
            return existingTeacher;
        }
        return null;
    }

    // Batch Methods
    public Batch createClass(Batch batchObj) {
        return classRepository.save(batchObj);
    }

    public Batch deleteBatch(String batchId) {
        Batch existingBatch = classRepository.findById(batchId).orElse(null);
        if (existingBatch !=null) {
            classRepository.delete(existingBatch);
            return existingBatch;
        }
        return null;
    }

    public List<Batch> getClassesByTeacherId(String teacherId) {
        return classRepository.findByTeacherId(teacherId);
    }

    // Assignment Methods
    //    public Assignment createAssignment(Assignment assignment) {
    //        return assignmentRepository.save(assignment);
    //    }

    public Assignment createAssignment(String classId, String title, String description, LocalDateTime deadline, String fileLink) {
        Assignment assignment = new Assignment();
        assignment.setClassId(classId);
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setCreationDate(java.time.LocalDateTime.from(java.time.LocalDateTime.now()));
        assignment.setDeadline(deadline);
        assignment.setFileLink(fileLink);
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByClassId(String classId) {
        return assignmentRepository.findByClassId(classId);
    }

    public List<Assignment> getAssignmentsByTeacherId(String teacherId) {
        List<Batch> batches = classRepository.findByTeacherId(teacherId);
        List<Assignment> assignments = new ArrayList<>();
        for (Batch batchObj : batches) {
            assignments.addAll(assignmentRepository.findByClassId(batchObj.getClassId()));
        }
        return assignments;
    }

    // Session methods
    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    public List<Session> getSessionsByClassId(String classId) {
        return sessionRepository.findByClassId(classId);
    }

    public List<Session> getSessionsByTeacherId(String teacherId) {
        List<Batch> batches = classRepository.findByTeacherId(teacherId);
        List<Session> sessions = new ArrayList<>();
        for (Batch batchObj : batches) {
            sessions.addAll(sessionRepository.findByClassId(batchObj.getClassId()));
        }
        return sessions;
    }

    // Material Methods
    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    public List<Material> getMaterialsByClassId(String classId) {
        return materialRepository.findByClassId(classId);
    }

    public List<Material> getMaterialsByTeacherId(String teacherId) {
        List<Batch> batches = classRepository.findByTeacherId(teacherId);
        List<Material> materials = new ArrayList<>();
        for (Batch batchObj : batches) {
            materials.addAll(materialRepository.findByClassId(batchObj.getClassId()));
        }
        return materials;
    }

    // Video Methods
    public Video createVideo(Video video) {
        return videoRepository.save(video);
    }

    public List<Video> getVideosByClassId(String classId) {
        return videoRepository.findByClassId(classId);
    }

    public List<Video> getVideosByTeacherId(String teacherId) {
        List<Batch> batches = classRepository.findByTeacherId(teacherId);
        List<Video> videos = new ArrayList<>();
        for (Batch batchObj : batches) {
            videos.addAll(videoRepository.findByClassId(batchObj.getClassId()));
        }
        return videos;
    }

    // Save a submission
    public AssignmentSubmission saveSubmission(String assignmentId, AssignmentSubmission submission) {
        submission.setAssignmentId(assignmentId);
        submission.setSubmittedAt(java.time.LocalDateTime.from(java.time.LocalDateTime.now()));
        return subrepo.save(submission);
    }
//
//    // Get all submissions by assignment ID
//    public List<AssignmentSubmission> getSubmissionsByAssignmentId(String assignmentId) {
//        return (List<AssignmentSubmission>) subrepo.findByAssignmentId(assignmentId);
//    }

    public List<AssignmentSubmission> getSubmissionsByAssignmentId(String assignmentId) {
        return subrepo.findByAssignmentId(assignmentId); // Make sure this returns a List<AssignmentSubmission>
    }


//    // Method to register student and send email with credentials
//    public Student registerStudent(Student student) {
//        Student registeredStudent = teacherServiceFeignClient.registerStudent(student);
//        sendRegistrationEmail(student.getEmail(), student.getPwd(), student.getClassId(), student.getName(), student.getStudentid());
//        return registeredStudent;
//    }
//
//    private void sendRegistrationEmail(String email, String password, String batch, String name, String id) {
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setFrom("edutech@lms.com");
//        mailMessage.setTo(email);
//        mailMessage.setSubject("Welcome to Edutech!");
//        String emailContent = String.format(
//                "Dear %s (ID : %s),\n\n" +
//                        "You have been successfully added to class ID: %s at Edutech. We are excited to have you on board!\n\n" +
//                        "Here are your login credentials for accessing the Edutech Learning Management System (LMS):\n\n" +
//                        " - Username: %s\n" +
//                        " - Password: %s\n\n" +
//                        "You can access the LMS portal and Start Learning!\n\n" +
//                        "Best Regards,\n" +
//                        "Your LMS Team",
//                name, id, batch, email, password);
//
//        mailMessage.setText(emailContent);
//        javaMailSender.send(mailMessage);
//    }
//
//    public List<Batch> getBatchByTeacherId(String teacherId) {
//        return classRepository.findByTeacherId(teacherId);
//    }
//
//    // Method to add a student to a class
//    public Student addStudentToClass(String classId, StudentInputDTO studentDto) {
//        // Create a new student object and set the classId
//        Student student = new Student();
//        student.setName(studentDto.getName());
//        student.setEmail(studentDto.getEmail());
//        student.setPwd(studentDto.getPwd());
//        student.setClassId(classId);
//
//        // Call the Student microservice to register the student
//        return teacherServiceFeignClient.registerStudent(student);
//    }

    // Method to register student and send email with credentials
    public Student registerStudent(Student student) {
        Student registeredStudent = teacherServiceFeignClient.registerStudent(student);
        sendRegistrationEmail(student.getEmail(), student.getPwd(), student.getClassId(), student.getName(), student.getStudentid());
        return registeredStudent;
    }

    private void sendRegistrationEmail(String email, String password, String batch, String name, String id) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("edutech@lms.com");
        mailMessage.setTo(email);
        mailMessage.setSubject("Welcome to Edutech!");
        String emailContent = String.format(
                "Dear %s (ID : %s),\n\n" +
                        "You have been successfully added to class ID: %s at Edutech. We are excited to have you on board!\n\n" +
                        "Here are your login credentials for accessing the Edutech Learning Management System (LMS):\n\n" +
                        " - Username: %s\n" +
                        " - Password: %s\n\n" +
                        "You can access the LMS portal and Start Learning!\n\n" +
                        "Best Regards,\n" +
                        "Your LMS Team",
                name, id, batch, email, password);

        mailMessage.setText(emailContent);
        javaMailSender.send(mailMessage);
    }

    public List<Batch> getBatchByTeacherId(String teacherId) {
        return classRepository.findByTeacherId(teacherId);
    }

    // Method to add a student to a class
    public Student addStudentToClass(String classId, StudentInputDTO studentDto) {
        // Create a new student object and set the classId
        Student student = new Student();
        student.setName(studentDto.getName());
        student.setEmail(studentDto.getEmail());
        student.setPwd(studentDto.getPwd());
        student.setClassId(classId);

        sendRegistrationEmail(student.getEmail(), student.getPwd(), classId, student.getName(), student.getStudentid());

        // Call the Student microservice to register the student
        return teacherServiceFeignClient.registerStudent(student);

    }

    public void deleteStudentById(String studentId) {
        teacherServiceFeignClient.deleteStudent(studentId);
    }


}
