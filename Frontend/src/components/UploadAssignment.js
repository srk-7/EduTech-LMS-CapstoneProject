import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { createAssignment } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCalendarAlt, faFileUpload, faClipboardList } from '@fortawesome/free-solid-svg-icons';

function UploadAssignment() {
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
        const assignmentData = {
            title: assignmentName,
            description,
            deadline: `${deadline}T00:00:00`,
            fileLink,
        };

        try {
            await createAssignment(classId, assignmentData);
            if (incrementAssignments) incrementAssignments();
            alert('Assignment created successfully!');
            navigate(`/classes/${classId}`);
        } catch (error) {
            console.error('Error creating assignment:', error);
            alert('Failed to create assignment. Please try again.');
        }
    };

    return (
        <div className="p-8 bg-gradient-to-r from-green-50 to-blue-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Upload Assignment</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Assignment Name
                    </label>
                    <input
                        type="text"
                        value={assignmentName}
                        onChange={(e) => setAssignmentName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Date of Assigning
                    </label>
                    <input
                        type="text"
                        value={today}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Deadline
                    </label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faFileUpload} className="mr-2" /> Assignment File Link
                    </label>
                    <input
                        type="text"
                        value={fileLink}
                        onChange={(e) => setFileLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
