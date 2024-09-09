import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionsForStudent } from '../services/studentService';
import Navbar from './Navbar';
import BackButton from './BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';

function StudentSessions() {
    const { studentId } = useParams();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSessionsForStudent(studentId);
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
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold mb-6 flex items-center text-blue-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-blue-600" />
                    Your Sessions
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sessions.length > 0 ? (
                        sessions.map((session) => (
                            <div key={session.sessionId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 flex items-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-indigo-600" />
                                    {session.sessionName}
                                </h2>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {session.description}
                                </p>
                                <p className="text-gray-600 mb-2">Date: {new Date(session.sessionDate).toLocaleDateString()}</p>
                                {session.sessionLink ? (
                                    <a
                                        href={session.sessionLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full block bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                                    >
                                        <FontAwesomeIcon icon={faLink} className="mr-2" />
                                        Join Session
                                    </a>
                                ) : (
                                    <p className="text-red-600">No link available</p>
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
