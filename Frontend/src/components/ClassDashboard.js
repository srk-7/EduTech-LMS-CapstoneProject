// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import { useParams, Link } from 'react-router-dom';
// import { getStudentCountByClassId, getAssignmentsByClassId, getMaterialsByClassId, getVideosByClassId, getSessionsByClassId } from '../services/teacherService';

// function ClassDashboard() {
//     const { classId } = useParams();
//     const [studentCount, setStudentCount] = useState(0);
//     const [assignmentCount, setAssignmentCount] = useState(0);
//     const [materialCount, setMaterialCount] = useState(0);
//     const [videoCount, setVideoCount] = useState(0);
//     const [sessionCount, setSessionCount] = useState(0);

//     useEffect(() => {
//         const fetchCounts = async () => {
//             try {
//                 const students = await getStudentCountByClassId(classId);
//                 setStudentCount(students);

//                 const assignments = await getAssignmentsByClassId(classId);
//                 setAssignmentCount(assignments.length);

//                 const materials = await getMaterialsByClassId(classId);
//                 setMaterialCount(materials.length);

//                 const videos = await getVideosByClassId(classId);
//                 setVideoCount(videos.length);

//                 const sessions = await getSessionsByClassId(classId);
//                 setSessionCount(sessions.length);
//             } catch (error) {
//                 console.error('Error fetching counts:', error);
//             }
//         };

//         fetchCounts();
//     }, [classId]);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />
//             <div className="p-8">
//                 {/* <h1 className="text-3xl font-bold mb-6">Class Dashboard for {classId}</h1> */}
//                 <center><h1 className="text-3xl font-bold mb-6">Class Dashboard</h1></center>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <Link to={`/classes/${classId}/students`} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
//                         <h2 className="text-xl font-semibold mb-2">Number of Students</h2>
//                         <p className="text-gray-700">{studentCount}</p>
//                     </Link>
//                     <Link to={`/classes/${classId}/view-assignments`} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
//                         <h2 className="text-xl font-semibold mb-2">Number of Assignments Given</h2>
//                         <p className="text-gray-700">{assignmentCount}</p>
//                     </Link>
//                     <Link to={`/classes/${classId}/view-materials`} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
//                         <h2 className="text-xl font-semibold mb-2">Number of Materials Uploaded</h2>
//                         <p className="text-gray-700">{materialCount}</p>
//                     </Link>
//                     <Link to={`/classes/${classId}/view-videos`} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
//                         <h2 className="text-xl font-semibold mb-2">Number of Videos Uploaded</h2>
//                         <p className="text-gray-700">{videoCount}</p>
//                     </Link>
//                     <Link to={`/classes/${classId}/view-sessions`} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
//                         <h2 className="text-xl font-semibold mb-2">Number of Sessions Scheduled</h2>
//                         <p className="text-gray-700">{sessionCount}</p>
//                     </Link>
//                 </div>
//                 <div className="mt-8">
//                     <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <Link to={`/classes/${classId}/upload-assignment`} className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
//                             Upload Assignment
//                         </Link>
//                         <Link to={`/classes/${classId}/upload-material`} className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
//                             Upload Material
//                         </Link>
//                         <Link to={`/classes/${classId}/upload-video`} className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
//                             Upload Video
//                         </Link>
//                         <Link to={`/classes/${classId}/upload-session`} className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
//                             Create Session
//                         </Link>
//                         <Link to={`/classes/${classId}/add-student`} className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
//                             Add Student
//                         </Link>
//                         <Link to={`/classes/${classId}/view-submissions`} className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
//                             View Submissions
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ClassDashboard;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
    getStudentCountByClassId,
    getAssignmentsByClassId,
    getMaterialsByClassId,
    getVideosByClassId,
    getSessionsByClassId
} from '../services/teacherService'; // Assume these service calls are already implemented

import { FaUserGraduate, FaFileAlt, FaVideo, FaBook, FaChalkboardTeacher, FaPlus, FaUpload, FaClipboardList } from 'react-icons/fa';

function ClassDashboard() {
    const { classId } = useParams();
    const [studentCount, setStudentCount] = useState(0);
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [materialCount, setMaterialCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const students = await getStudentCountByClassId(classId);
                setStudentCount(students);

                const assignments = await getAssignmentsByClassId(classId);
                setAssignmentCount(assignments.length);

                const materials = await getMaterialsByClassId(classId);
                setMaterialCount(materials.length);

                const videos = await getVideosByClassId(classId);
                setVideoCount(videos.length);

                const sessions = await getSessionsByClassId(classId);
                setSessionCount(sessions.length);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, [classId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
            <Navbar />
            <div className="p-8">
                <center>
                    <h1 className="text-4xl font-bold mb-10 text-gray-800">Class Dashboard</h1>
                </center>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link to={`/classes/${classId}/students`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <FaUserGraduate className="text-blue-600 text-4xl" />
                            <div>
                                <h2 className="text-2xl font-semibold text-blue-600">Students</h2>
                                <p className="text-gray-600 text-xl">{studentCount}</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/classes/${classId}/view-assignments`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <FaFileAlt className="text-blue-600 text-4xl" />
                            <div>
                                <h2 className="text-2xl font-semibold text-blue-600">Assignments</h2>
                                <p className="text-gray-600 text-xl">{assignmentCount}</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/classes/${classId}/view-materials`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <FaBook className="text-blue-600 text-4xl" />
                            <div>
                                <h2 className="text-2xl font-semibold text-blue-600">Materials</h2>
                                <p className="text-gray-600 text-xl">{materialCount}</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/classes/${classId}/view-videos`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <FaVideo className="text-blue-600 text-4xl" />
                            <div>
                                <h2 className="text-2xl font-semibold text-blue-600">Videos</h2>
                                <p className="text-gray-600 text-xl">{videoCount}</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/classes/${classId}/view-sessions`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-4">
                            <FaChalkboardTeacher className="text-blue-600 text-4xl" />
                            <div>
                                <h2 className="text-2xl font-semibold text-blue-600">Sessions</h2>
                                <p className="text-gray-600 text-xl">{sessionCount}</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="mt-12">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to={`/classes/${classId}/upload-assignment`} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaUpload />
                            <span>Upload Assignment</span>
                        </Link>
                        <Link to={`/classes/${classId}/upload-material`} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaUpload />
                            <span>Upload Material</span>
                        </Link>
                        <Link to={`/classes/${classId}/upload-video`} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaUpload />
                            <span>Upload Video</span>
                        </Link>
                        <Link to={`/classes/${classId}/upload-session`} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaChalkboardTeacher />
                            <span>Create Session</span>
                        </Link>
                        <Link to={`/classes/${classId}/add-student`} className="bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaPlus />
                            <span>Add Student</span>
                        </Link>
                        <Link to={`/classes/${classId}/view-submissions`} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaFileAlt />
                            <span>View Submissions</span>
                        </Link>
                        {/* New Mark Attendance Quick Action */}
                        <Link to={`/classes/${classId}/mark-attendance`} className="bg-orange-500 text-white p-4 rounded-lg shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                            <FaClipboardList />
                            <span>Mark Attendance</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassDashboard;
