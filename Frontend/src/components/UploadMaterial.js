import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createMaterial } from '../services/teacherService';

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
            alert('Material uploaded successfully!');
            navigate(`/classes/${classId}`);
        } catch (error) {
            console.error('Error uploading material:', error);
            alert('Failed to upload material.');
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Upload Material for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Upload Material</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Upload Material
                </button>
            </form>
        </div>
    );
}

export default UploadMaterial;
