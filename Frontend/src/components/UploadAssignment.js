import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { createAssignment } from '../services/teacherService'; // Ensure this service is correctly implemented

function UploadAssignment() {
    // const { classId } = useParams();
    const { classId: urlClassId } = useParams();
    const classId = urlClassId || localStorage.getItem('classId');
    const location = useLocation();
    const navigate = useNavigate();
    const incrementAssignments = location.state?.incrementAssignments;
    const [assignmentName, setAssignmentName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [fileLink, setFileLink] = useState('');
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to be sent to the backend
        const assignmentData = {
            title: assignmentName,
            description,
            deadline: `${deadline}T00:00:00`, // Convert to ISO format with time
            fileLink,
        };

        console.log('Assignment data:', assignmentData); // Log the data for debugging

        try {
            await createAssignment(classId, assignmentData);

            // Optionally increment the number of assignments in the dashboard
            if (incrementAssignments) {
                incrementAssignments();
            }

            alert('Assignment created successfully!');
            navigate(`/classes/${classId}`); // Redirect to the class dashboard
        } catch (error) {
            console.error('Error creating assignment:', error);
            alert('Failed to create assignment. Please try again.');
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Upload Assignment for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Upload Assignment</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Assignment Name</label>
                    <input
                        type="text"
                        value={assignmentName}
                        onChange={(e) => setAssignmentName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Assignment Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Description"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Date of Assigning</label>
                    <input
                        type="text"
                        value={today}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Assignment File Link</label>
                    <input
                        type="text"
                        value={fileLink}
                        onChange={(e) => setFileLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter File Link"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                    Create Assignment
                </button>
            </form>
        </div>
    );
}

export default UploadAssignment;
