import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsByClassId, deleteAssignment } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faClipboardList, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import BackButton from './BackButton';

function ViewAssignments() {
    const { classId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);

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

    const handleDeleteClick = (assignmentId) => {
        setAssignmentToDelete(assignmentId); // Set the assignment ID to be deleted
        setShowConfirmation(true); // Show the confirmation modal
    };

    const confirmDelete = async () => {
        if (assignmentToDelete) {
            try {
                await deleteAssignment(assignmentToDelete);
                setAssignments(assignments.filter(assignment => assignment.assignmentId !== assignmentToDelete)); // Remove the deleted assignment from the state
                toast.success('Assignment deleted successfully!'); // Success toast
                setShowConfirmation(false); // Hide the confirmation modal
            } catch (error) {
                console.error('Error deleting assignment:', error);
                toast.error('Failed to delete assignment.'); // Error toast
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false); // Hide the confirmation modal
        setAssignmentToDelete(null); // Reset the assignment to delete
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    <FontAwesomeIcon className="mr-2" />
                    Assignments Assigned
                </h1>
                {assignments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assignments.map((assignment) => (
                            <div key={assignment.assignmentId} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative">
                                <h2 className="text-2xl font-bold mb-2 text-indigo-700 flex items-center">
                                    <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-indigo-600" />
                                    {assignment.title}
                                </h2>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {assignment.description || 'No description available'}
                                </p>
                                <p className="text-sm text-gray-500 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />
                                    Due Date: {new Date(assignment.deadline).toLocaleDateString()}
                                </p>
                                {assignment.fileLink && (
                                    <a
                                        href={assignment.fileLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out flex items-center"
                                    >
                                        View Assignment
                                    </a>
                                )}

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteClick(assignment.assignmentId)}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No assignments available for this class.</p>
                )}

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this assignment?</h3>
                            <div className="flex justify-end">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700 transition duration-200 ease-in-out"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ToastContainer to handle success/error messages */}
            <ToastContainer />
        </>
    );
}

export default ViewAssignments;
