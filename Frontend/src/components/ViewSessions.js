// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getSessionsByClassId } from '../services/teacherService';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt, faClock, faInfoCircle, faVideo, faLink } from '@fortawesome/free-solid-svg-icons';
// import Navbar from './Navbar'; // Assuming you have a Navbar component

// function ViewSessions() {
//     const { classId } = useParams();
//     const [sessions, setSessions] = useState([]);

//     useEffect(() => {
//         const fetchSessions = async () => {
//             try {
//                 const response = await getSessionsByClassId(classId);
//                 console.log('API Response:', response); // Debugging step to log the API response
//                 setSessions(response);
//             } catch (error) {
//                 console.error('Error fetching sessions:', error);
//             }
//         };

//         fetchSessions();
//     }, [classId]);

//     return (
//         <>
//             <Navbar />
//             <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
//                 <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Upcoming Sessions</h1>
//                 {sessions.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {sessions.map((session) => (
//                             <div key={session.sessionId} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
//                                 <h2 className="text-2xl font-bold mb-2 text-indigo-700 flex items-center">
//                                     <FontAwesomeIcon icon={faVideo} className="mr-2 text-indigo-600" />
//                                     {session.sessionName}
//                                 </h2>
//                                 <p className="text-gray-600 mb-4 flex items-center">
//                                     <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
//                                     {session.description || 'No description available'}
//                                 </p>
//                                 <p className="text-sm text-gray-500 mb-2 flex items-center">
//                                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
//                                     Date: {session.sessionDate ? new Date(session.sessionDate).toLocaleDateString() : 'Date not available'}
//                                 </p>
//                                 <p className="text-sm text-gray-500 mb-4 flex items-center">
//                                     <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
//                                     Time: {session.sessionTime ? session.sessionTime : 'Time not available'}
//                                 </p>
//                                 {session.sessionLink ? (
//                                     <a
//                                         href={session.sessionLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out flex items-center"
//                                     >
//                                         <FontAwesomeIcon icon={faLink} className="mr-2" />
//                                         Join Session
//                                     </a>
//                                 ) : (
//                                     <p className="text-sm text-red-500">Link not available</p>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-600">No sessions available for this class.</p>
//                 )}
//             </div>
//         </>
//     );
// }

// export default ViewSessions;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionsByClassId, deleteSession } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faInfoCircle, faVideo, faLink, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import BackButton from './BackButton';

function ViewSessions() {
    const { classId } = useParams();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await getSessionsByClassId(classId);
                setSessions(response);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, [classId]);

    const handleDelete = async (sessionId) => {
        try {
            await deleteSession(sessionId);
            setSessions(sessions.filter(session => session.sessionId !== sessionId)); // Update the state after deletion
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
                <div className="mb-6">
                    <BackButton />
                </div>
                <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Upcoming Sessions</h1>
                {sessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions.map((session) => (
                            <div key={session.sessionId} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative">
                                <h2 className="text-2xl font-bold mb-2 text-indigo-700 flex items-center">
                                    <FontAwesomeIcon icon={faVideo} className="mr-2 text-indigo-600" />
                                    {session.sessionName}
                                </h2>
                                <p className="text-gray-600 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {session.description || 'No description available'}
                                </p>
                                <p className="text-sm text-gray-500 mb-2 flex items-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                                    Date: {session.sessionDate ? new Date(session.sessionDate).toLocaleDateString() : 'Date not available'}
                                </p>
                                <p className="text-sm text-gray-500 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-400" />
                                    Time: {session.sessionTime ? session.sessionTime : 'Time not available'}
                                </p>
                                {session.sessionLink ? (
                                    <a
                                        href={session.sessionLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out flex items-center"
                                    >
                                        <FontAwesomeIcon icon={faLink} className="mr-2" />
                                        Join Session
                                    </a>
                                ) : (
                                    <p className="text-sm text-red-500">Link not available</p>
                                )}

                                <button
                                    onClick={() => handleDelete(session.sessionId)}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No sessions available for this class.</p>
                )}
            </div>
        </>
    );
}

export default ViewSessions;
