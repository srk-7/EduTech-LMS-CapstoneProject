import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideosForStudent } from '../services/studentService';
import Navbar from './Navbar';
import BackButton from './BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';

function StudentVideos() {
    const { studentId } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getVideosForStudent(studentId);
                setVideos(data.videos || []);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchData();
    }, [studentId]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold mb-6 flex items-center text-blue-600">
                    <FontAwesomeIcon icon={faVideo} className="mr-3 text-blue-600" />
                    Your Videos
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <div key={video.videoId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 flex items-center">
                                    <FontAwesomeIcon icon={faVideo} className="mr-2 text-indigo-600" />
                                    {video.title}
                                </h2>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {video.description}
                                </p>
                                <a href={video.link} target="_blank" rel="noopener noreferrer" className="w-full block bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition duration-200 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faLink} className="mr-2" />
                                    Watch Video
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No videos available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentVideos;
