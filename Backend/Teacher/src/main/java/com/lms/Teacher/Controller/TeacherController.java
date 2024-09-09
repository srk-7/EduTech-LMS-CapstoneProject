package com.lms.Teacher.Controller;

import com.lms.Teacher.Repository.TeacherRepository;
import com.lms.Teacher.dto.AssignmentInputDTO;
import com.lms.Teacher.dto.LoginRequest;
import com.lms.Teacher.dto.StudentInputDTO;
import com.lms.Teacher.dto.TeacherInputDTO;
import com.lms.Teacher.entity.*;
import com.lms.Teacher.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherRepository teacherRepository;

    /**
     * Creates a new teacher account.
     *
     * @param teacher The input data for the new teacher
     * @return The created Teacher entity
     */
    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestBody TeacherInputDTO teacher) {
        Teacher createdTeacher = teacherService.createTeacher(teacher);
        return ResponseEntity.ok(createdTeacher);
    }

    /**
     * Updates an existing teacher account.
     *
     * @param teacherId The ID of the teacher to update
     * @param teacher   Updated teacher data
     * @return The updated Teacher entity
     */
    @PostMapping("/updateTeacher/{teacherId}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable String teacherId, @RequestBody Teacher teacher) {
        Teacher updatedTeacher = teacherService.updateTeacher(teacherId, teacher);
        return ResponseEntity.ok(updatedTeacher);
    }

    /**
     * Deletes a teacher account by ID.
     *
     * @param teacherId The ID of the teacher to delete
     * @return A status indicating success or failure
     */
    @DeleteMapping("/deleteTeacher/{teacherId}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable String teacherId) {
        teacherService.deleteTeacher(teacherId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Creates a new class (batch) for a teacher.
     *
     * @param teacherId The ID of the teacher
     * @param batchObj  The class (batch) data
     * @return The created Batch entity
     */
    @PostMapping("/{teacherId}/classes")
    public ResponseEntity<Batch> createClass(@PathVariable String teacherId, @RequestBody Batch batchObj) {
        batchObj.setTeacherId(teacherId);
        Batch createdBatch = teacherService.createClass(batchObj);
        return ResponseEntity.ok(createdBatch);
    }

    /**
     * Retrieves all classes (batches) for a given teacher.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Batch entities
     */
    @GetMapping("/{teacherId}/classes")
    public ResponseEntity<List<Batch>> getClassesByTeacherId(@PathVariable String teacherId) {
        List<Batch> classes = teacherService.getClassesByTeacherId(teacherId);
        return ResponseEntity.ok(classes);
    }

    /**
     * Deletes a class (batch) by ID.
     *
     * @param batchId The ID of the batch to delete
     * @return The deleted Batch entity
     */
    @DeleteMapping("/deleteBatch/{batchId}")
    public ResponseEntity<Batch> deleteBatch(@PathVariable String batchId) {
        Batch deletedBatch = teacherService.deleteBatch(batchId);
        return ResponseEntity.ok(deletedBatch);
    }

    /**
     * Creates a new assignment for a class.
     *
     * @param classId            The class ID
     * @param assignmentInputDTO The input data for the assignment
     * @return The created Assignment entity
     */
    @PostMapping("/classes/{classId}/assignments")
    public ResponseEntity<Assignment> createAssignment(
            @PathVariable String classId,
            @RequestBody AssignmentInputDTO assignmentInputDTO) {
        Assignment assignment = teacherService.createAssignment(
                classId,
                assignmentInputDTO.getTitle(),
                assignmentInputDTO.getDescription(),
                assignmentInputDTO.getDeadline(),
                assignmentInputDTO.getFileLink()
        );
        return ResponseEntity.ok(assignment);
    }

    @DeleteMapping("/materials/{materialId}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable String materialId) {
        teacherService.deleteMaterialById(materialId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> deleteSession(@PathVariable String sessionId) {
        teacherService.deleteSessionById(sessionId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/videos/{videoId}")
    public ResponseEntity<Void> deleteVideo(@PathVariable String videoId) {
        teacherService.deleteVideoById(videoId);
        return ResponseEntity.noContent().build();
    }


    /**
     * Retrieves all assignments for a teacher.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Assignment entities
     */
    @GetMapping("/{teacherId}/assignments")
    public ResponseEntity<List<Assignment>> getAssignmentsByTeacherId(@PathVariable String teacherId) {
        List<Assignment> assignments = teacherService.getAssignmentsByTeacherId(teacherId);
        return ResponseEntity.ok(assignments);
    }

    /**
     * Retrieves all assignments for a class.
     *
     * @param classId The class ID
     * @return A list of Assignment entities
     */
    @GetMapping("/classes/{classId}/assignments")
    public ResponseEntity<List<Assignment>> getAssignmentsByClassId(@PathVariable String classId) {
        List<Assignment> assignments = teacherService.getAssignmentsByClassId(classId);
        return ResponseEntity.ok(assignments);
    }
    /**
     * Deletes an assignment by its ID.
     *
     * @param assignmentId The ID of the assignment to delete
     * @return A response entity indicating success or failure
     */
    @DeleteMapping("/assignments/{assignmentId}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable String assignmentId) {
        teacherService.deleteAssignmentById(assignmentId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Creates a new session for a class.
     *
     * @param classId The class ID
     * @param session The Session entity to create
     * @return The created Session entity
     */
    @PostMapping("/classes/{classId}/sessions")
    public ResponseEntity<Session> createSession(@PathVariable String classId, @RequestBody Session session) {
        session.setClassId(classId);
        Session createdSession = teacherService.createSession(session);
        return ResponseEntity.ok(createdSession);
    }

    /**
     * Retrieves all sessions for a class.
     *
     * @param classId The class ID
     * @return A list of Session entities
     */
    @GetMapping("/classes/{classId}/sessions")
    public ResponseEntity<List<Session>> getSessionsByClassId(@PathVariable String classId) {
        List<Session> sessions = teacherService.getSessionsByClassId(classId);
        return ResponseEntity.ok(sessions);
    }

    /**
     * Retrieves all sessions for a teacher.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Session entities
     */
    @GetMapping("/{teacherId}/sessions")
    public ResponseEntity<List<Session>> getSessionsByTeacherId(@PathVariable String teacherId) {
        List<Session> sessions = teacherService.getSessionsByTeacherId(teacherId);
        return ResponseEntity.ok(sessions);
    }

    /**
     * Creates a new material for a class.
     *
     * @param classId  The class ID
     * @param material The Material entity to create
     * @return The created Material entity
     */
    @PostMapping("/classes/{classId}/materials")
    public ResponseEntity<Material> createMaterial(@PathVariable String classId, @RequestBody Material material) {
        material.setClassId(classId);
        Material createdMaterial = teacherService.createMaterial(material);
        return ResponseEntity.ok(createdMaterial);
    }

    /**
     * Retrieves all materials for a class.
     *
     * @param classId The class ID
     * @return A list of Material entities
     */
    @GetMapping("/classes/{classId}/materials")
    public ResponseEntity<List<Material>> getMaterialsByClassId(@PathVariable String classId) {
        List<Material> materials = teacherService.getMaterialsByClassId(classId);
        return ResponseEntity.ok(materials);
    }

    /**
     * Retrieves all materials for a teacher.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Material entities
     */
    @GetMapping("/{teacherId}/materials")
    public ResponseEntity<List<Material>> getMaterialsByTeacherId(@PathVariable String teacherId) {
        List<Material> materials = teacherService.getMaterialsByTeacherId(teacherId);
        return ResponseEntity.ok(materials);
    }

    /**
     * Creates a new video for a class.
     *
     * @param classId The class ID
     * @param video   The Video entity to create
     * @return The created Video entity
     */
    @PostMapping("/classes/{classId}/videos")
    public ResponseEntity<Video> createVideo(@PathVariable String classId, @RequestBody Video video) {
        video.setClassId(classId);
        Video createdVideo = teacherService.createVideo(video);
        return ResponseEntity.ok(createdVideo);
    }

    /**
     * Retrieves all videos for a class.
     *
     * @param classId The class ID
     * @return A list of Video entities
     */
    @GetMapping("/classes/{classId}/videos")
    public ResponseEntity<List<Video>> getVideosByClassId(@PathVariable String classId) {
        List<Video> videos = teacherService.getVideosByClassId(classId);
        return ResponseEntity.ok(videos);
    }

    /**
     * Retrieves all videos for a teacher.
     *
     * @param teacherId The ID of the teacher
     * @return A list of Video entities
     */
    @GetMapping("/{teacherId}/videos")
    public ResponseEntity<List<Video>> getVideosByTeacherId(@PathVariable String teacherId) {
        List<Video> videos = teacherService.getVideosByTeacherId(teacherId);
        return ResponseEntity.ok(videos);
    }

    /**
     * Records a student's assignment submission.
     *
     * @param assignmentId The assignment ID
     * @param submission   The AssignmentSubmission entity
     * @return The recorded AssignmentSubmission entity
     */
    @PostMapping("/assignments/{assignmentId}/submissions")
    public ResponseEntity<AssignmentSubmission> receiveSubmission(
            @PathVariable String assignmentId, @RequestBody AssignmentSubmission submission) {
        AssignmentSubmission savedSubmission = teacherService.saveSubmission(assignmentId, submission);
        return ResponseEntity.ok(savedSubmission);
    }

    /**
     * Retrieves all submissions for a given assignment ID.
     *
     * @param assignmentId The assignment ID
     * @return A list of AssignmentSubmission entities
     */
    @GetMapping("/assignments/{assignmentId}/submissions")
    public ResponseEntity<List<AssignmentSubmission>> getSubmissions(@PathVariable String assignmentId) {
        List<AssignmentSubmission> submissions = teacherService.getSubmissionsByAssignmentId(assignmentId);
        return ResponseEntity.ok(submissions);
    }

    /**
     * Registers a new student and sends them their credentials.
     *
     * @param student The Student entity to register
     * @return The registered Student entity
     */
    @PostMapping("/students")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student createdStudent = teacherService.registerStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    /**
     * Deletes a student by their ID.
     *
     * @param studentId The ID of the student to delete
     * @return A status indicating success or failure
     */
    @DeleteMapping("/deleteStudent/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId) {
        teacherService.deleteStudentById(studentId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Adds a student to a class.
     *
     * @param classId    The class ID
     * @param studentDto The student input data
     * @return The registered Student entity
     */
    @PostMapping("/classes/{classId}/students")
    public ResponseEntity<Student> addStudentToClass(@PathVariable String classId, @RequestBody StudentInputDTO studentDto) {
        Student newStudent = teacherService.addStudentToClass(classId, studentDto);
        return ResponseEntity.ok(newStudent);
    }

    /**
     * Authenticates a teacher by their email and password.
     *
     * @param loginRequest The login request data
     * @return The authenticated Teacher entity or an error message
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody LoginRequest loginRequest) {
        Teacher teacher = teacherRepository.findByEmail(loginRequest.getEmail());
        if (teacher == null || !teacher.getPwd().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        return ResponseEntity.ok(teacher);
    }
}
