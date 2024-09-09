import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentsByClassId, deleteStudent } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

function StudentList() {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudentsByClassId(classId);
                setStudents(response);
                // toast.success('Students fetched successfully!'); // Success toast for fetching students
            } catch (error) {
                console.error('Error fetching students:', error);
                toast.error('Failed to fetch students.'); // Error toast for fetching failure
            }
        };

        fetchStudents();
    }, [classId]);

    const handleDeleteClick = (studentId) => {
        setStudentToDelete(studentId);
        setShowConfirmation(true); // Show confirmation modal before deletion
    };

    const confirmDelete = async () => {
        if (studentToDelete) {
            try {
                await deleteStudent(studentToDelete);
                setStudents(students.filter(student => student.studentId !== studentToDelete)); // Update list after deletion
                setShowConfirmation(false); // Close confirmation modal
                toast.success('Student deleted successfully!'); // Success toast for deletion
            } catch (error) {
                console.error('Error deleting student:', error);
                toast.error('Failed to delete student.'); // Error toast for deletion failure
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false); // Close confirmation modal without deleting
        setStudentToDelete(null);
    };

    return (
        <>
        <Navbar />
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Students</h1>
            {students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map((student) => (
                        <div key={student.studentId} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl relative">
                            {/* Delete Button in the top-right corner */}
                            <button
                                onClick={() => handleDeleteClick(student.studentId)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    {/* Placeholder for student avatar */}
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                                        alt={`${student.name}'s avatar`}
                                        className="w-24 h-24 rounded-full shadow-lg"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold mb-1 text-blue-600">{student.name}</h2>
                                <p className="text-gray-600 mb-2">Email: {student.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No students found in this class.</p>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this student?</h3>
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

        {/* ToastContainer to display toasts */}
        <ToastContainer />
        </>
    );
}

export default StudentList;
