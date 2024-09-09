import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSession } from '../services/teacherService'; // Ensure this service is correctly implemented

function CreateSession() {
    const { classId } = useParams(); // Use the classId from the URL
    const [formData, setFormData] = useState({
        sessionDate: '',
        sessionTime: '',
        sessionLink: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ensure the date and time are in the correct format
            const newSession = {
                ...formData,
                sessionDate: formData.sessionDate,  // yyyy/MM/dd
                sessionTime: formData.sessionTime   // HH:mm
            };

            await createSession(classId, newSession); // Send the session to backend
            alert('Session created successfully!');
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Create New Session</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Session Date</label>
                    <input
                        type="date"
                        name="sessionDate"
                        value={formData.sessionDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Session Time</label>
                    <input
                        type="time"
                        name="sessionTime"
                        value={formData.sessionTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Session Link</label>
                    <input
                        type="url"
                        name="sessionLink"
                        value={formData.sessionLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Create Session
                </button>
            </form>
        </div>
    );
}

export default CreateSession;
