import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSession } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faClock, faCalendarAlt, faLink, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function UploadSession() {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [sessionName, setSessionName] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [sessionLink, setSessionLink] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sessionData = {
            sessionName,
            sessionDate,
            sessionTime,
            sessionLink,
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
        <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Create Session</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faVideo} className="mr-2" /> Session Name
                    </label>
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
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Date
                    </label>
                    <input
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faClock} className="mr-2" /> Time
                    </label>
                    <input
                        type="time"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faLink} className="mr-2" /> Session Link
                    </label>
                    <input
                        type="text"
                        value={sessionLink}
                        onChange={(e) => setSessionLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter Session Link"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter Session Description"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
                >
                    Create Session
                </button>
            </form>
        </div>
    );
}

export default UploadSession;
