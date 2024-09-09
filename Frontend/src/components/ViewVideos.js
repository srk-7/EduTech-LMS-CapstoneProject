import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideosByClassId, deleteVideo } from '../services/teacherService'; // Ensure deleteVideo service is implemented
import Navbar from './Navbar';
import BackButton from './BackButton'; // Import the BackButton
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faLink, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ViewVideos() {
    const { classId } = useParams();
    const [videos, setVideos] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);

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

    const handleDeleteClick = (videoId) => {
        setVideoToDelete(videoId); // Set the video ID to be deleted
        setShowConfirmation(true); // Show the confirmation modal
    };

    const confirmDelete = async () => {
        if (videoToDelete) {
            try {
                await deleteVideo(videoToDelete);
                setVideos(videos.filter(video => video.videoId !== videoToDelete)); // Remove the deleted video from the state
                setShowConfirmation(false); // Hide the confirmation modal
            } catch (error) {
                console.error('Error deleting video:', error);
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false); // Hide the confirmation modal
        setVideoToDelete(null); // Reset the video to delete
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                {/* Add the BackButton here */}
                <div className="mb-6">
                    <BackButton />
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    <FontAwesomeIcon icon={faVideo} className="mr-2" /> Videos
                </h1>
                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div
                                key={video.videoId}
                                className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative"
                            >
                                <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center">
                                    <FontAwesomeIcon icon={faVideo} className="mr-2 text-blue-600" />
                                    {video.title}
                                </h2>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {video.description || 'No description available'}
                                </p>
                                {video.link && (
                                    <a
                                        href={video.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out flex items-center"
                                    >
                                        <FontAwesomeIcon icon={faLink} className="mr-2" />
                                        Watch Video
                                    </a>
                                )}

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteClick(video.videoId)}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No videos available for this class.</p>
                )}

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this video?</h3>
                            <div className="flex justify-end">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700 transition duration-200 ease-in-out"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ViewVideos;
