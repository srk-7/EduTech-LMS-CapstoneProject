package com.lms.Teacher.Controller;

import com.lms.Teacher.Repository.TeacherRepository;
import com.lms.Teacher.dto.AssignmentInputDTO;
import com.lms.Teacher.dto.LoginRequest;
import com.lms.Teacher.dto.StudentInputDTO;
import com.lms.Teacher.dto.TeacherInputDTO;
import com.lms.Teacher.entity.Assignment;
import com.lms.Teacher.entity.*;
import com.lms.Teacher.Service.TeacherService;
import com.lms.Teacher.entity.Batch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController
{

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherRepository teacherRepository;


    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestBody TeacherInputDTO teacher) {
        return ResponseEntity.ok(teacherService.createTeacher(teacher));
    }

    @PostMapping("/updateTeacher/{teacherId}")
    public Teacher updateteacher(@PathVariable String teacherId, @RequestBody Teacher teacher){
        return teacherService.updateTeacher(teacherId, teacher);
    }

    @DeleteMapping("/deleteTeacher/{teacherId}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable String teacherId) {
        teacherService.deleteTeacher(teacherId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{teacherId}/classes")
    public ResponseEntity<Batch> createClass(@PathVariable String teacherId, @RequestBody Batch batchObj) {
        batchObj.setTeacherId(teacherId);
        return ResponseEntity.ok(teacherService.createClass(batchObj));
    }

    @GetMapping("/{teacherId}/classes")
    public ResponseEntity<List<Batch>> getClassesByTeacherId(@PathVariable String teacherId) {
        return ResponseEntity.ok(teacherService.getClassesByTeacherId(teacherId));
    }

    @DeleteMapping("/deleteBatch/{batchId}")
    public Batch deleteBatch(@PathVariable String batchId){
        return teacherService.deleteBatch(batchId);
    }

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

    @GetMapping("/{teacherId}")
    public List<Batch> getBatchByTeacherId(@PathVariable String teacherId)
    {
        return teacherService.getBatchByTeacherId(teacherId);
    }

    @GetMapping("/{teacherId}/assignments")
    public ResponseEntity<List<Assignment>> getAssignmentsByTeacherId(@PathVariable String teacherId) {
        return ResponseEntity.ok(teacherService.getAssignmentsByTeacherId(teacherId));
    }

    @GetMapping("/classes/{classId}/assignments")
    public ResponseEntity<List<Assignment>> getAssignmentsByClassId(@PathVariable String classId) {
        return ResponseEntity.ok(teacherService.getAssignmentsByClassId(classId));
    }

    @PostMapping("/classes/{classId}/sessions")
    public ResponseEntity<Session> createSession(@PathVariable String classId, @RequestBody Session session) {
        session.setClassId(classId);
        return ResponseEntity.ok(teacherService.createSession(session));
    }

    @GetMapping("/classes/{classId}/sessions")
    public ResponseEntity<List<Session>> getSessionsByClassId(@PathVariable String classId) {
        return ResponseEntity.ok(teacherService.getSessionsByClassId(classId));
    }

    @GetMapping("/{teacherId}/sessions")
    public ResponseEntity<List<Session>> getSessionsByTeacherId(@PathVariable String teacherId) {
        return ResponseEntity.ok(teacherService.getSessionsByTeacherId(teacherId));
    }

    @PostMapping("/classes/{classId}/materials")
    public ResponseEntity<Material> createMaterial(@PathVariable String classId, @RequestBody Material material) {
        material.setClassId(classId);
        return ResponseEntity.ok(teacherService.createMaterial(material));
    }

    @GetMapping("/classes/{classId}/materials")
    public ResponseEntity<List<Material>> getMaterialsByClassId(@PathVariable String classId) {
        return ResponseEntity.ok(teacherService.getMaterialsByClassId(classId));
    }

    @GetMapping("/{teacherId}/materials")
    public List<Material> getMaterialsByTeacherId(@PathVariable String teacherId) {
        return teacherService.getMaterialsByTeacherId(teacherId);
    }

    @PostMapping("/classes/{classId}/videos")
    public ResponseEntity<Video> createVideo(@PathVariable String classId, @RequestBody Video video) {
        video.setClassId(classId);
        return ResponseEntity.ok(teacherService.createVideo(video));
    }

    @GetMapping("/classes/{classId}/videos")
    public ResponseEntity<List<Video>> getVideosByClassId(@PathVariable String classId) {
        return ResponseEntity.ok(teacherService.getVideosByClassId(classId));
    }

    @GetMapping("/{teacherId}/videos")
    public List<Video> getVideosByTeacherId(@PathVariable String teacherId) {
        return teacherService.getVideosByTeacherId(teacherId);
    }

    @PostMapping("/assignments/{assignmentId}/submissions")
    public ResponseEntity<AssignmentSubmission> receiveSubmission(@PathVariable String assignmentId, @RequestBody AssignmentSubmission submission) {
        return ResponseEntity.ok(teacherService.saveSubmission(assignmentId, submission));
    }

    @GetMapping("/assignments/{assignmentId}/submissions")
    public ResponseEntity<List<AssignmentSubmission>> getSubmissions(@PathVariable String assignmentId) {
        List<AssignmentSubmission> submissions = teacherService.getSubmissionsByAssignmentId(assignmentId);
        return ResponseEntity.ok(submissions);
    }

    @PostMapping("/students")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student createdStudent = teacherService.registerStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    @DeleteMapping("/deleteStudent/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentId) {
        teacherService.deleteStudentById(studentId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/classes/{classId}/students")
    public ResponseEntity<Student> addStudentToClass(@PathVariable String classId, @RequestBody StudentInputDTO studentDto) {
        Student newStudent = teacherService.addStudentToClass(classId, studentDto);
        return ResponseEntity.ok(newStudent);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody LoginRequest loginRequest) {
        Teacher teacher = teacherRepository.findByEmail(loginRequest.getEmail());
        if (teacher == null || !teacher.getPwd().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        return ResponseEntity.ok(teacher);
    }

}
