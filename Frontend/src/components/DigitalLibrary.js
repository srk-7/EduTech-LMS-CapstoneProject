import React, { useState } from 'react';
import Navbar from './Navbar';
import BackButton from './BackButton'; // Import the BackButton component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faVideo } from '@fortawesome/free-solid-svg-icons'; // Import icons

function DigitalLibrary() {
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const API_KEY = 'AIzaSyAtGFJIUJAYTW9IRcCM7Pt1JZjhqUQY294';
        const query = `${searchQuery} educational tutorial`; // Add keywords to restrict content
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&videoCategoryId=27&key=${API_KEY}`);
        const data = await response.json();

        const videoResults = data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

        setVideos(videoResults);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50">
            <Navbar />
            <div className="p-8">
                <div className="mb-6">
                    <BackButton /> 
                </div>
                <h1 className="text-4xl font-bold text-blue-600 mb-10 text-center">
                    <FontAwesomeIcon icon={faVideo} className="mr-3" />
                    Digital Library
                </h1>
                <form onSubmit={handleSearch} className="mb-12 max-w-xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for educational videos..."
                            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition duration-300 ease-in-out"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg flex items-center"
                        >
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                            Search
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <div
                                key={video.id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <a href={video.link} target="_blank" rel="noopener noreferrer" className="block">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="mb-4 w-full h-48 object-cover rounded-lg"
                                    />
                                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{video.title}</h3>
                                    <p className="text-gray-700 text-sm">
                                        {video.description.length > 100
                                            ? `${video.description.substring(0, 100)}...`
                                            : video.description}
                                    </p>
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center text-lg col-span-full">No videos found. Try searching for something else.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DigitalLibrary;
