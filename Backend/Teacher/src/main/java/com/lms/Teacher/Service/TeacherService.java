package com.lms.Teacher.Service;

import com.lms.Teacher.client.TeacherServiceFeignClient;
import com.lms.Teacher.dto.StudentInputDTO;
import com.lms.Teacher.dto.TeacherInputDTO;
import com.lms.Teacher.entity.*;
import com.lms.Teacher.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    private AssignmentSubmissionRepository submissionRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    /**
     * Creates a new teacher account.
     *
     * @param teacher Input data for the teacher
     * @return The created Teacher entity
     */
    public Teacher createTeacher(TeacherInputDTO teacher) {
        Teacher newTeacher = new Teacher();
        newTeacher.setName(teacher.getName());
        newTeacher.setEmail(teacher.getEmail());
        newTeacher.setPwd(teacher.getPwd());
        newTeacher.setRole("Teacher");
        return teacherRepository.save(newTeacher);
    }

    /**
     * Updates a teacher's account details.
     *
     * @param teacherId The ID of the teacher to update
     * @param teacher   Updated Teacher entity data
     * @return The updated Teacher entity
     */
    public Teacher updateTeacher(String teacherId, Teacher teacher) {
        Optional<Teacher> existingTeacher = teacherRepository.findById(teacherId);
        if (existingTeacher.isPresent()) {
            Teacher updatedTeacher = existingTeacher.get();
            updatedTeacher.setName(teacher.getName());
            updatedTeacher.setEmail(teacher.getEmail());
            updatedTeacher.setPwd(teacher.getPwd());
            return teacherRepository.save(updatedTeacher);
        }
        throw new RuntimeException("Teacher not found with ID: " + teacherId);
    }

    /**
     * Deletes a teacher account by ID.
     *
     * @param id The ID of the teacher to delete
     * @return The deleted Teacher entity, or null if not found
     */
    public Teacher deleteTeacher(String id) {
        Optional<Teacher> existingTeacher = teacherRepository.findById(id);
        if (existingTeacher.isPresent()) {
            teacherRepository.delete(existingTeacher.get());
            return existingTeacher.get();
        }
        throw new RuntimeException("Teacher not found with ID: " + id);
    }

    /**
     * Creates a new class (batch) for the teacher.
     *
     * @param batchObj The Batch entity to create
     * @return The created Batch entity
     */
    public Batch createClass(Batch batchObj) {
        return classRepository.save(batchObj);
    }

    /**
     * Deletes a class (batch) by ID.
     *
     * @param batchId The ID of the batch to delete
     * @return The deleted Batch entity
     */
    public Batch deleteBatch(String batchId) {
        Optional<Batch> existingBatch = classRepository.findById(batchId);
        if (existingBatch.isPresent()) {
            classRepository.delete(existingBatch.get());
            return existingBatch.get();
        }
        throw new RuntimeException("Batch not found with ID: " + batchId);
    }

    /**
     * Retrieves all classes (batches) by teacher ID.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Batch entities
     */
    public List<Batch> getClassesByTeacherId(String teacherId) {
        return classRepository.findByTeacherId(teacherId);
    }

    /**
     * Creates a new assignment for a class.
     *
     * @param classId     The class ID the assignment belongs to
     * @param title       The assignment title
     * @param description The assignment description
     * @param deadline    The deadline for the assignment
     * @param fileLink    Link to the assignment file
     * @return The created Assignment entity
     */
    public Assignment createAssignment(String classId, String title, String description, LocalDateTime deadline, String fileLink) {
        Assignment assignment = new Assignment();
        assignment.setClassId(classId);
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setCreationDate(LocalDateTime.now());
        assignment.setDeadline(deadline);
        assignment.setFileLink(fileLink);
        return assignmentRepository.save(assignment);
    }

    /**
     * Retrieves all assignments for a given class ID.
     *
     * @param classId The class ID
     * @return A list of Assignment entities
     */
    public List<Assignment> getAssignmentsByClassId(String classId) {
        return assignmentRepository.findByClassId(classId);
    }

    /**
     * Retrieves all assignments for a teacher by teacher ID.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Assignment entities for all classes of the teacher
     */
    public List<Assignment> getAssignmentsByTeacherId(String teacherId) {
        List<Batch> batches = getClassesByTeacherId(teacherId);
        List<Assignment> assignments = new ArrayList<>();
        for (Batch batch : batches) {
            assignments.addAll(assignmentRepository.findByClassId(batch.getClassId()));
        }
        return assignments;
    }

    /**
     * Creates a new session for a class.
     *
     * @param session The Session entity to create
     * @return The created Session entity
     */
    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    /**
     * Retrieves all sessions for a given class ID.
     *
     * @param classId The class ID
     * @return A list of Session entities
     */
    public List<Session> getSessionsByClassId(String classId) {
        return sessionRepository.findByClassId(classId);
    }

    /**
     * Retrieves all sessions for a teacher by teacher ID.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Session entities for all classes of the teacher
     */
    public List<Session> getSessionsByTeacherId(String teacherId) {
        List<Batch> batches = getClassesByTeacherId(teacherId);
        List<Session> sessions = new ArrayList<>();
        for (Batch batch : batches) {
            sessions.addAll(sessionRepository.findByClassId(batch.getClassId()));
        }
        return sessions;
    }

    /**
     * Creates a new material for a class.
     *
     * @param material The Material entity to create
     * @return The created Material entity
     */
    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    /**
     * Retrieves all materials for a given class ID.
     *
     * @param classId The class ID
     * @return A list of Material entities
     */
    public List<Material> getMaterialsByClassId(String classId) {
        return materialRepository.findByClassId(classId);
    }

    /**
     * Retrieves all materials for a teacher by teacher ID.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Material entities for all classes of the teacher
     */
    public List<Material> getMaterialsByTeacherId(String teacherId) {
        List<Batch> batches = getClassesByTeacherId(teacherId);
        List<Material> materials = new ArrayList<>();
        for (Batch batch : batches) {
            materials.addAll(materialRepository.findByClassId(batch.getClassId()));
        }
        return materials;
    }

    /**
     * Creates a new video for a class.
     *
     * @param video The Video entity to create
     * @return The created Video entity
     */
    public Video createVideo(Video video) {
        return videoRepository.save(video);
    }

    /**
     * Retrieves all videos for a given class ID.
     *
     * @param classId The class ID
     * @return A list of Video entities
     */
    public List<Video> getVideosByClassId(String classId) {
        return videoRepository.findByClassId(classId);
    }

    /**
     * Retrieves all videos for a teacher by teacher ID.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Video entities for all classes of the teacher
     */
    public List<Video> getVideosByTeacherId(String teacherId) {
        List<Batch> batches = getClassesByTeacherId(teacherId);
        List<Video> videos = new ArrayList<>();
        for (Batch batch : batches) {
            videos.addAll(videoRepository.findByClassId(batch.getClassId()));
        }
        return videos;
    }

    /**
     * Saves a student's assignment submission.
     *
     * @param assignmentId The ID of the assignment
     * @param submission   The AssignmentSubmission entity to save
     * @return The saved AssignmentSubmission entity
     */
    public AssignmentSubmission saveSubmission(String assignmentId, AssignmentSubmission submission) {
        submission.setAssignmentId(assignmentId);
        submission.setSubmittedAt(LocalDateTime.now());
        return submissionRepository.save(submission);
    }

    /**
     * Retrieves all submissions for a given assignment ID.
     *
     * @param assignmentId The assignment ID
     * @return A list of AssignmentSubmission entities
     */
    public List<AssignmentSubmission> getSubmissionsByAssignmentId(String assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId);
    }

    /**
     * Registers a new student and sends an email with login credentials.
     *
     * @param student The Student entity to register
     * @return The registered Student entity
     */
    public Student registerStudent(Student student) {
        Student registeredStudent = teacherServiceFeignClient.registerStudent(student);
        sendRegistrationEmail(student.getEmail(), student.getPwd(), student.getClassName(), student.getName(), student.getStudentId());
        return registeredStudent;
    }

    /**
     * Sends a registration email to the student with their credentials.
     *
     * @param email    The student's email
     * @param password The student's password
     * @param batch    The batch (class) name
     * @param name     The student's name
     * @param id       The student's ID
     */
    private void sendRegistrationEmail(String email, String password, String batch, String name, String id) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("edutech@lms.com");
        mailMessage.setTo(email);
        mailMessage.setSubject("Welcome to Edutech!");
        String emailContent = String.format(
                "Dear %s (ID : %s),\n\n" +
                        "You have been successfully added to Class: %s at Edutech. We are excited to have you on board!\n\n" +
                        "Here are your login credentials for accessing the Edutech Learning Management System (LMS):\n\n" +
                        " - Username: %s\n" +
                        " - Password: %s\n\n" +
                        "You can access the LMS portal and start learning!\n\n" +
                        "Best Regards,\n" +
                        "Your LMS Team",
                name, id, batch, email, password);

        mailMessage.setText(emailContent);
        javaMailSender.send(mailMessage);
    }

    /**
     * Adds a student to a class and registers them.
     *
     * @param classId    The ID of the class
     * @param studentDto The student input data
     * @return The registered Student entity
     */
    public Student addStudentToClass(String classId, StudentInputDTO studentDto) {
        Student student = new Student();
        student.setName(studentDto.getName());
        student.setEmail(studentDto.getEmail());
        student.setPwd(studentDto.getPwd());
        student.setClassId(classId);

        sendRegistrationEmail(student.getEmail(), student.getPwd(), classId, student.getName(), student.getStudentId());

        return teacherServiceFeignClient.registerStudent(student);
    }

    /**
     * Deletes a student by their ID.
     *
     * @param studentId The ID of the student to delete
     */
    public void deleteStudentById(String studentId) {
        teacherServiceFeignClient.deleteStudent(studentId);
    }
}
