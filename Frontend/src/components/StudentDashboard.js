import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { 
    getMaterialsForStudent, 
    getVideosForStudent, 
    getAssignmentsForStudent, 
    getSessionsForStudent 
} from '../services/studentService';
// import { Line } from 'react-chartjs-2'; // Chart.js for analytics

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

    // // Dummy data for the Line chart
    // const assignmentChartData = {
    //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    //     datasets: [
    //         {
    //             label: 'Assignments Submitted',
    //             data: [2, 3, 5, 4], // Dummy data for illustration
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 2,
    //             fill: true,
    //         },
    //     ],
    // };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200">
            <Navbar />
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-10 text-gray-900 text-center">Student Dashboard</h1>

                {/* Chart Section
                <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Assignments Progress</h2>
                    <Line data={assignmentChartData} />
                </div> */}

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link to={`/students/${studentId}/materials`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Materials</h2>
                        <p className="text-lg text-gray-700">{materials.length > 0 ? materials.length : 'No'} materials available</p>
                    </Link>

                    <Link to={`/students/${studentId}/videos`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Videos</h2>
                        <p className="text-lg text-gray-700">{videos.length > 0 ? videos.length : 'No'} videos available</p>
                    </Link>

                    <Link to={`/students/${studentId}/assignments`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Assignments</h2>
                        <p className="text-lg text-gray-700">{assignments.length > 0 ? assignments.length : 'No'} assignments available</p>
                    </Link>

                    <Link to={`/students/${studentId}/sessions`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Sessions</h2>
                        <p className="text-lg text-gray-700">{sessions.length > 0 ? sessions.length : 'No'} sessions scheduled</p>
                    </Link>

                    <Link to={`/students/${studentId}/submit-assignment`} className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                        <span>Submit Assignment</span>
                    </Link>

                    <Link to={`/students/${studentId}/digital-library`} className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center space-x-3">
                        <span>Digital Library</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
