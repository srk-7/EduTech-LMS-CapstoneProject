import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterTeacher from './components/RegisterTeacher';
import LoginTeacher from './components/LoginTeacher';
import LoginStudent from './components/LoginStudent';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ClassDashboard from './components/ClassDashboard';
import AddClass from './components/AddClass';
import UploadAssignment from './components/UploadAssignment';
import UploadMaterial from './components/UploadMaterial';
import UploadVideo from './components/UploadVideo';
import CreateSession from './components/CreateSession';
import AddStudent from './components/AddStudent';
import ViewAssignments from './components/ViewAssignments';
import StudentList from './components/StudentList';
import ViewMaterials from './components/ViewMaterials';
import ViewVideos from './components/ViewVideos';
import ViewSessions from './components/ViewSessions';
import UploadSession from './components/UploadSessions';
import StudentMaterials from './components/StudentMaterials';
import StudentAssignments from './components/StudentAssignments';
import StudentSessions from './components/StudentSessions';
import StudentVideos from './components/StudentVideos';
import DigitalLibrary from './components/DigitalLibrary';
import StudentSubmitAssignment from './components/StudentSubmitAssignment';
import ViewSubmissions from './components/ViewSubmissions';
import AssignmentSubmissions from './components/AssignmentSubmissions';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/add-class" element={<AddClass />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/register-teacher" element={<RegisterTeacher />} />
                <Route path="/login-teacher" element={<LoginTeacher />} />
                <Route path="/login-student" element={<LoginStudent />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/classes/:classId" element={<ClassDashboard />} />
                <Route path="/classes/:classId/upload-assignment" element={<UploadAssignment />} />
                <Route path="/classes/:classId/upload-material" element={<UploadMaterial />} />
                <Route path="/classes/:className/upload-video" element={<UploadVideo />} />
                <Route path="/classes/:className/create-session" element={<CreateSession />} />
                <Route path="/classes/:classId/add-student" element={<AddStudent />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/classes/:classId/view-assignments" element={<ViewAssignments />} />
                <Route path="/classes/:classId/assignment" element={<UploadAssignment />} />
                <Route path="/classes/:classId/upload-material" element={<UploadMaterial />} />
                <Route path="/classes/:classId/upload-video" element={<UploadVideo />} />
                <Route path="/classes/:classId/view-materials" element={<ViewMaterials />} />
                <Route path="/classes/:classId/view-videos" element={<ViewVideos />} />
                <Route path="/classes/:classId/upload-session" element={<UploadSession />} />
                <Route path="/classes/:classId/view-sessions" element={<ViewSessions />} />
                <Route path="/classes/:classId/students" element={<StudentList />} />
                <Route path="/students/:studentId/dashboard" element={<StudentDashboard />} />
                <Route path="/students/:studentId/materials" element={<StudentMaterials />} />
                <Route path="/students/:studentId/videos" element={<StudentVideos />} />
                <Route path="/students/:studentId/assignments" element={<StudentAssignments />} />
                <Route path="/students/:studentId/sessions" element={<StudentSessions />} />
                <Route path="/students/:studentId/digital-library" element={<DigitalLibrary />} />
                <Route path="/students/:studentId/submit-assignment" element={<StudentSubmitAssignment />} />
                <Route path="/classes/:classId/view-submissions" element={<ViewSubmissions />} />
                <Route path="/classes/:classId/assignments/:assignmentId/submissions" element={<AssignmentSubmissions />} />   
            </Routes>
        </Router>
    );
}

export default App;
