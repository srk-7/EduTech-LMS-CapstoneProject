import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
            
            <Link to="/">
                <button className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded shadow-lg">
                    Go to Homepage
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
