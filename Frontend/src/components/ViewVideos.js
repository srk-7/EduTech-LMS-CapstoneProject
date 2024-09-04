import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideosByClassId } from '../services/teacherService';

function ViewVideos() {
    const { classId } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getVideosByClassId(classId);
                setVideos(response);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, [classId]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Videos for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Videos</h1>
            {videos.length > 0 ? (
                <ul>
                    {videos.map((video) => (
                        <li key={video.videoId} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{video.title}</h2>
                            <p>{video.description}</p>
                            <a href={video.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Watch Video</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No videos available for this class.</p>
            )}
        </div>
    );
}

export default ViewVideos;
