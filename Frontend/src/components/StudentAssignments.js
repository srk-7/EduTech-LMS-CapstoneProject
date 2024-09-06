import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsForStudent } from '../services/studentService';
import Navbar from './Navbar';
import BackButton from './BackButton'; // Import BackButton
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

function StudentAssignments() {
    const { studentId } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAssignmentsForStudent(studentId);
                console.log('Fetched Assignments:', data); // Log the fetched assignments
                setAssignments(data.assignments || []);
            } catch (error) {
                console.error('Error fetching assignments:', error);
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
                    <FontAwesomeIcon icon={faClipboard} className="mr-3 text-blue-600" />
                    Your Assignments
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <div key={assignment.assignmentId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2">{assignment.title}</h2>
                                <p className="text-gray-700 mb-4">{assignment.description}</p>
                                <p className="text-gray-600 mb-4">Due: {new Date(assignment.deadline).toLocaleString()}</p>
                                {assignment.fileLink ? (
                                    <a
                                        href={assignment.fileLink} // Use the fileLink from the backend response
                                        target="_blank" // Open in a new tab
                                        rel="noopener noreferrer" // Security for external links
                                        className="w-full block bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition duration-200"
                                    >
                                        View Assignment
                                    </a>
                                ) : (
                                    <p className="text-red-600">No file available</p> // Fallback if no link is available
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No assignments available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentAssignments;
