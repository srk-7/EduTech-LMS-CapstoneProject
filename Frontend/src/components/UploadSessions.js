import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSession } from '../services/teacherService'; // Ensure this service is correctly implemented

function UploadSession() {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [sessionName, setSessionName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sessionData = {
            sessionName,
            date,
            time,
            link,
            description,
        };

        try {
            await createSession(classId, sessionData);
            alert('Session created successfully!');
            navigate(`/classes/${classId}`);
        } catch (error) {
            console.error('Error creating session:', error);
            alert('Failed to create session. Please try again.');
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Create Session for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Create Session</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Session Name</label>
                    <input
                        type="text"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter Session Name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Session Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter Session Link"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter Session Description"
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

export default UploadSession;
