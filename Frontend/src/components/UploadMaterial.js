import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createMaterial } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLink, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

import BackButton from './BackButton';

function UploadMaterial() {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const materialData = { title, description, link };
            await createMaterial(classId, materialData);
            toast.success('Material uploaded successfully!'); // Success toast
            setTimeout(() => navigate(`/classes/${classId}`), 2000); // Redirect after delay
        } catch (error) {
            console.error('Error uploading material:', error);
            toast.error('Failed to upload material. Please try again.'); // Error toast
        }
    };

    return (
        <div className="p-8 bg-gradient-to-r from-green-50 to-blue-100 min-h-screen">
            <div className="mb-6">
                    <BackButton />
            </div>
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Upload Material</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faBook} className="mr-2" /> Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faEdit} className="mr-2" /> Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <FontAwesomeIcon icon={faLink} className="mr-2" /> Link
                    </label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                    Upload Material
                </button>
            </form>

            <ToastContainer />
        </div>
    );
}

export default UploadMaterial;
