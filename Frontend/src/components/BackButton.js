// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}  // Navigate back to the previous page
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
        >
            Back
        </button>
    );
}

export default BackButton;
