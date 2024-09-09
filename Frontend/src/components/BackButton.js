import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out flex items-center"
        >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
        </button>
    );
}

export default BackButton;
