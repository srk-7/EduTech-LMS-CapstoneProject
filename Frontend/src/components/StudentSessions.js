import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionsForStudent } from '../services/studentService';
import Navbar from './Navbar';

function StudentSessions() {
    const { studentId } = useParams();  // Get the studentId from the URL parameters
    const [sessions, setSessions] = useState([]);  // Initialize state to hold session data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSessionsForStudent(studentId);  // Fetch sessions data
                console.log('Fetched sessions:', data);  // Log the fetched data for debugging
                setSessions(data.sessions || []);  // Set sessions state or default to an empty array
            } catch (error) {
                console.error('Error fetching sessions:', error);  // Log any errors
            }
        };

        fetchData();  // Call the fetch function when the component mounts
    }, [studentId]);

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Your Sessions</h1>
            {sessions.length > 0 ? (
                <ul>
                    {sessions.map((session) => (
                        <li key={session.sessionId} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{session.title}</h2>
                            <p><strong>Description:</strong> {session.description}</p>
                            <p><strong>Date:</strong> {new Date(session.date).toLocaleString()}</p>
                            {session.link && (
                                <p>
                                    <strong>Join Link:</strong>{' '}
                                    <a href={session.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Click here to join
                                    </a>
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sessions available.</p>
            )}
        </div>
        </>
    );
}

export default StudentSessions;
