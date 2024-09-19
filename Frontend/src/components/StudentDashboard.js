import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import TodoList from './TodoList';
import Notes from './Notes'
import { 
    getMaterialsForStudent, 
    getVideosForStudent, 
    getAssignmentsForStudent, 
    getSessionsForStudent 
} from '../services/studentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faVideo, faClipboard, faCalendar, faUpload, faSearch } from '@fortawesome/free-solid-svg-icons';

function StudentDashboard() {
    const [materials, setMaterials] = useState([]);
    const [videos, setVideos] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [sessions, setSessions] = useState([]);
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedMaterials = await getMaterialsForStudent(studentId);
                setMaterials(fetchedMaterials?.materials || []);
                
                const fetchedVideos = await getVideosForStudent(studentId);
                setVideos(fetchedVideos?.videos || []);
                
                const fetchedAssignments = await getAssignmentsForStudent(studentId);
                setAssignments(fetchedAssignments?.assignments || []);
                
                const fetchedSessions = await getSessionsForStudent(studentId);
                setSessions(fetchedSessions?.sessions || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (studentId) {
            fetchData();
        }
    }, [studentId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200">
            <Navbar />
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-10 text-gray-900 text-center">Student Dashboard</h1>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Material Card */}
                    <Link to={`/students/${studentId}/materials`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faBook} className="text-indigo-600 text-5xl mb-4" />
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Materials</h2>
                            <p className="text-lg text-gray-700">{materials.length > 0 ? materials.length : 'No'} materials available</p>
                        </div>
                    </Link>

                    {/* Videos Card */}
                    <Link to={`/students/${studentId}/videos`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faVideo} className="text-indigo-600 text-5xl mb-4" />
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Videos</h2>
                            <p className="text-lg text-gray-700">{videos.length > 0 ? videos.length : 'No'} videos available</p>
                        </div>
                    </Link>

                    {/* Assignments Card */}
                    <Link to={`/students/${studentId}/assignments`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faClipboard} className="text-indigo-600 text-5xl mb-4" />
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Assignments</h2>
                            <p className="text-lg text-gray-700">{assignments.length > 0 ? assignments.length : 'No'} assignments available</p>
                        </div>
                    </Link>

                    {/* Sessions Card */}
                    <Link to={`/students/${studentId}/sessions`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faCalendar} className="text-indigo-600 text-5xl mb-4" />
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Sessions</h2>
                            <p className="text-lg text-gray-700">{sessions.length > 0 ? sessions.length : 'No'} sessions scheduled</p>
                        </div>
                    </Link>

                    {/* Submit Assignment Card */}
                    <Link to={`/students/${studentId}/submit-assignment`} className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faUpload} className="text-white text-5xl mb-4" />
                            <h2 className="text-2xl font-semibold">Submit Assignment</h2>
                        </div>
                    </Link>

                    {/* Digital Library Card */}
                    <Link to={`/students/${studentId}/digital-library`} className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faSearch} className="text-white text-5xl mb-4" />
                            <h2 className="text-2xl font-semibold">Digital Library</h2>
                        </div>
                    </Link>
                </div>

                <TodoList />
                <Notes />
            </div>
        </div>
    );
}

export default StudentDashboard;
