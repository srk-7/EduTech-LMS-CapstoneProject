import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsByClassId } from '../services/teacherService'; // Ensure this service is correctly implemented

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
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Assignments for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Assignments</h1>
            {assignments.length > 0 ? (
                <ul>
                    {assignments.map((assignment) => (
                        <li key={assignment.assignmentId} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{assignment.title}</h2>
                            <p>{assignment.description}</p>
                            <p>Due: {new Date(assignment.deadline).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No assignments available for this class.</p>
            )}
        </div>
    );
}

export default ViewAssignments;
