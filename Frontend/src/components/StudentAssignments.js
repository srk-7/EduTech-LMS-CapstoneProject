import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsForStudent } from '../services/studentService';
import Navbar from './Navbar';

function StudentAssignments() {
    const { studentId } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAssignmentsForStudent(studentId);
                setAssignments(data.assignments || []);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchData();
    }, [studentId]);

    return (
        <>

<Navbar/>
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Your Assignments</h1>
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
                <p>No assignments available.</p>
            )}
        </div>

        </>
    );
}

export default StudentAssignments;
