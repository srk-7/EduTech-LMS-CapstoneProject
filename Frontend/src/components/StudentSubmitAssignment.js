import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssignmentsForStudent, submitAssignment } from '../services/studentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faLink } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton'; // Import BackButton
import Navbar from './Navbar'; // Import Navbar
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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
                toast.error('Failed to fetch assignments. Please try again later.');
            }
        };

        fetchAssignments();
    }, [studentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAssignment || !submissionLink) {
            toast.error('Please select an assignment and provide a submission link.');
            return;
        }

        try {
            const submission = {
                studentId,
                submissionLink,
            };
            await submitAssignment(selectedAssignment, submission);
            toast.success('Assignment submitted successfully!');
            setTimeout(() => navigate(`/students/${studentId}/dashboard`), 2000);
        } catch (error) {
            console.error('Error submitting assignment:', error);
            toast.error('Failed to submit assignment. Please try again later.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
            <div className="mb-6"> {/* Create a gap between BackButton and h1 */}
                <BackButton /> 
            </div>
            <h1 className="text-3xl font-bold mb-6 flex items-center">
                <FontAwesomeIcon icon={faFileUpload} className="mr-3 text-blue-600" />
                Submit Assignment
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                        <FontAwesomeIcon icon={faFileUpload} className="mr-2 text-indigo-600" />
                        Select Assignment
                    </label>
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
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                        <FontAwesomeIcon icon={faLink} className="mr-2 text-indigo-600" />
                        Submission Link
                    </label>
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* Toast container */}
        </div>
        </>
    );
}

export default StudentSubmitAssignment;
