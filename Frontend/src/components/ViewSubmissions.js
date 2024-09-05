import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams, Link } from 'react-router-dom';
import { getAssignmentsByClassId } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">View Submissions</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center">
                        <FontAwesomeIcon icon={faBook} className="mr-2" /> Select an Assignment
                    </h2>
                    {assignments.length > 0 ? (
                        <ul className="space-y-4">
                            {assignments.map((assignment) => (
                                <li key={assignment.assignmentId} className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition duration-200 ease-in-out">
                                    <div className="text-indigo-700 font-medium">
                                        <FontAwesomeIcon icon={faBook} className="mr-2" />
                                        {assignment.title}
                                    </div>
                                    <Link
                                        to={`/classes/${classId}/assignments/${assignment.assignmentId}/submissions`}
                                        className="text-indigo-600 hover:text-indigo-700 flex items-center"
                                    >
                                        View Submissions
                                        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600">No assignments available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ViewSubmissions;
