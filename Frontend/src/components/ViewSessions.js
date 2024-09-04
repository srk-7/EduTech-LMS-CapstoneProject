import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionsByClassId } from '../services/teacherService'; // Ensure this service is correctly implemented

function ViewSessions() {
    const { classId } = useParams();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await getSessionsByClassId(classId);
                setSessions(response);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, [classId]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Sessions for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Sessions</h1>
            {sessions.length > 0 ? (
                <ul className="space-y-4">
                    {sessions.map((session) => (
                        <li key={session.sessionId} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{session.sessionName}</h2>
                                    <p className="text-gray-600">{session.description}</p>
                                    <p className="text-gray-500">Date: {new Date(session.sessionDate).toLocaleDateString()}</p>
                                    <p className="text-gray-500">Time: {session.sessionTime ? session.sessionTime : 'Time not available'}</p>
  
                                </div>
                                <a href={session.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Join Session
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sessions available for this class.</p>
            )}
        </div>
    );
}

export default ViewSessions;
