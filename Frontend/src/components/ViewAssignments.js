import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsByClassId } from '../services/teacherService'; // Ensure this service is correctly implemented
import Navbar from './Navbar';

function ViewAssignments() {
    const { classId } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await getAssignmentsByClassId(classId);
                setAssignments(response);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [classId]);

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Assignments</h1>
                {assignments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assignments.map((assignment) => (
                            <div key={assignment.assignmentId} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                <h2 className="text-2xl font-bold mb-2 text-indigo-700">{assignment.title}</h2>
                                <p className="text-gray-700 mb-4">{assignment.description}</p>
                                <p className="text-sm text-gray-500">Due: {new Date(assignment.deadline).toLocaleString()}</p>
                                {assignment.fileLink && (
                                    <a
                                        href={assignment.fileLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
                                    >
                                        View Assignment File
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No assignments available for this class.</p>
                )}
            </div>
        </>
    );
}

export default ViewAssignments;
