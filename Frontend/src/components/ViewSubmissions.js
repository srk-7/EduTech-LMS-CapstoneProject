import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams, Link } from 'react-router-dom';
import { getAssignmentsByClassId } from '../services/teacherService';

function ViewSubmissions() {
    const { classId } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const assignmentsData = await getAssignmentsByClassId(classId);
                console.log('Fetched assignments:', assignmentsData); // Log the assignments data to inspect
                if (assignmentsData) {
                    setAssignments(assignmentsData);
                } else {
                    setAssignments([]); // Handle case where no assignments are returned
                }
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [classId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                {/* <h1 className="text-3xl font-bold mb-6">View Submissions </h1> */}

                <h1 className="text-3xl font-bold mb-6">View Submissions for Class {classId}</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Select an Assignment</h2>
                    <ul>
                        {assignments.map((assignment) => {
                            console.log('Assignment ID:', assignment.assignmentId); // Updated to use assignmentId field
                            return (
                                <li key={assignment.assignmentId} className="mb-4">
                                    <Link
                                        to={`/classes/${classId}/assignments/${assignment.assignmentId}/submissions`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {assignment.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {assignments.length === 0 && <p>No assignments available.</p>}
                </div>
            </div>
        </div>
    );
}

export default ViewSubmissions;
