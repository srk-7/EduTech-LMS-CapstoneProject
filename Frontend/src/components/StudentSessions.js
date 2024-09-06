import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionsForStudent } from '../services/studentService';
import Navbar from './Navbar';
import BackButton from './BackButton'; // Import BackButton
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function StudentSessions() {
    const { studentId } = useParams(); // Extract student ID from URL
    const [sessions, setSessions] = useState([]); // State to store fetched sessions

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSessionsForStudent(studentId); // Fetch sessions for student
                console.log('Fetched Sessions:', data); // Log the fetched sessions
                setSessions(data.sessions || []);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchData();
    }, [studentId]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
                <div className="mb-6">
                    <BackButton /> {/* BackButton */}
                </div>
                <h1 className="text-3xl font-bold mb-6 flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-purple-600" />
                    Your Sessions
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sessions.length > 0 ? (
                        sessions.map((session) => (
                            <div key={session.sessionId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2">{session.sessionName}</h2>
                                <p className="text-gray-700 mb-4">{session.description}</p>
                                <p className="text-gray-600 mb-2">Date: {session.sessionDate}</p>
                                <p className="text-gray-600 mb-4">Time: {session.sessionTime}</p>
                                {session.sessionLink ? (
                                    <a
                                        href={session.sessionLink} // Use the sessionLink for joining the session
                                        target="_blank" // Open in a new tab
                                        rel="noopener noreferrer" // Security for external links
                                        className="w-full block bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition duration-200"
                                    >
                                        Join Session
                                    </a>
                                ) : (
                                    <p className="text-red-600">No link available</p> // Fallback if no link is available
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No sessions available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentSessions;
