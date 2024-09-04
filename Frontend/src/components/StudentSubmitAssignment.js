import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssignmentsForStudent, submitAssignment } from '../services/studentService';

function StudentSubmitAssignment() {
    const { studentId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [submissionLink, setSubmissionLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const fetchedAssignments = await getAssignmentsForStudent(studentId);
                setAssignments(fetchedAssignments.assignments || []);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [studentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAssignment || !submissionLink) {
            alert('Please select an assignment and provide a submission link.');
            return;
        }

        try {
            const submission = {
                studentId,
                submissionLink,
            };
            await submitAssignment(selectedAssignment, submission);
            alert('Assignment submitted successfully!');
            navigate(`/students/${studentId}/dashboard`);
        } catch (error) {
            console.error('Error submitting assignment:', error);
            alert('Failed to submit assignment. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Submit Assignment</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Select Assignment</label>
                    <select
                        value={selectedAssignment}
                        onChange={(e) => setSelectedAssignment(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="">Select an assignment</option>
                        {assignments.map((assignment) => (
                            <option key={assignment.assignmentId} value={assignment.assignmentId}>
                                {assignment.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Submission Link</label>
                    <input
                        type="text"
                        value={submissionLink}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter link to your assignment"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Submit Assignment
                </button>
            </form>
        </div>
    );
}

export default StudentSubmitAssignment;
