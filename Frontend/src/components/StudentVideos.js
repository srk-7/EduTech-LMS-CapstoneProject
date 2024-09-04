import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideosForStudent } from '../services/studentService';
import Navbar from './Navbar';

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
        <Navbar/>
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Your Videos</h1>
            {videos.length > 0 ? (
                <ul>
                    {videos.map((video) => (
                        <li key={video.videoId} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {video.title}
                            </a>
                            <p>{video.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No videos available.</p>
            )}
        </div>
        </>
    );
}

export default StudentVideos;
