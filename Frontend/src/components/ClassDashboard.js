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

import {
    FaUserGraduate,
    FaFileAlt,
    FaVideo,
    FaBook,
    FaChalkboardTeacher,
    FaPlus,
    FaUpload,
    FaClipboardList
} from 'react-icons/fa';

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
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full bg-blue-600 w-20 hover:w-56 transition-all duration-300 ease-in-out overflow-hidden shadow-lg z-10">
                <div className="flex flex-col items-center space-y-8 p-4 pt-24">
                    <Link to={`/classes/${classId}/upload-assignment`} className="group flex items-center space-x-3">
                        <FaUpload className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Upload Assignment
                        </span>
                    </Link>

                    <Link to={`/classes/${classId}/upload-material`} className="group flex items-center space-x-3">
                        <FaUpload className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Upload Material
                        </span>
                    </Link>

                    <Link to={`/classes/${classId}/upload-video`} className="group flex items-center space-x-3">
                        <FaVideo className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Upload Video
                        </span>
                    </Link>

                    <Link to={`/classes/${classId}/upload-session`} className="group flex items-center space-x-3">
                        <FaChalkboardTeacher className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Create Session
                        </span>
                    </Link>

                    <Link to={`/classes/${classId}/add-student`} className="group flex items-center space-x-3">
                        <FaPlus className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Add Student
                        </span>
                    </Link>

                    <Link to={`/classes/${classId}/view-submissions`} className="group flex items-center space-x-3">
                        <FaFileAlt className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View Submissions
                        </span>
                    </Link>

                    <Link to={`/classes/${classId}/mark-attendance`} className="group flex items-center space-x-3">
                        <FaClipboardList className="text-white text-3xl group-hover:text-yellow-400 transition-all" />
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Mark Attendance
                        </span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-20">
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
                </div>
            </div>
        </div>
    );
}

export default ClassDashboard;
