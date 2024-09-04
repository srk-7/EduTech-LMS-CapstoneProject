// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function CreateSession() {
//     const { className } = useParams();
//     const navigate = useNavigate();
//     const [sessionName, setSessionName] = useState('');
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [sessionLink, setSessionLink] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle the form submission, e.g., send data to the backend
//         console.log({
//             className,
//             sessionName,
//             date,
//             time,
//             sessionLink,
//             description,
//         });

//         // Show success toast notification
//         toast.success('Session created successfully!');

//         // Redirect back to class dashboard
//         navigate(`/classes/${className}`);
//     };

//     return (
//         <div className="p-8 bg-gray-100 min-h-screen">
//             {/* <h1 className="text-3xl font-bold mb-6">Create Session for Class {className}</h1> */}
//             <center><h1 className="text-3xl font-bold mb-6">Create Session</h1></center>
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-semibold mb-2">Session Name</label>
//                     <input
//                         type="text"
//                         value={sessionName}
//                         onChange={(e) => setSessionName(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Enter Session Name"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-semibold mb-2">Date</label>
//                     <input
//                         type="date"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-semibold mb-2">Time</label>
//                     <input
//                         type="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-semibold mb-2">Session Link</label>
//                     <input
//                         type="text"
//                         value={sessionLink}
//                         onChange={(e) => setSessionLink(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Enter Session Link"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-semibold mb-2">Description</label>
//                     <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         placeholder="Enter Description"
//                         required
//                     ></textarea>
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//                 >
//                     Create Session
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CreateSession;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSession } from '../services/teacherService'; // Ensure this service is correctly implemented

function CreateSession() {
    const { classId } = useParams(); // Use the classId from the URL
    const [formData, setFormData] = useState({
        sessionDate: '',
        sessionTime: '',
        sessionLink: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ensure the date and time are in the correct format
            const newSession = {
                ...formData,
                sessionDate: formData.sessionDate,  // yyyy/MM/dd
                sessionTime: formData.sessionTime   // HH:mm
            };

            await createSession(classId, newSession); // Send the session to backend
            alert('Session created successfully!');
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Create New Session</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Session Date</label>
                    <input
                        type="date"
                        name="sessionDate"
                        value={formData.sessionDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Session Time</label>
                    <input
                        type="time"
                        name="sessionTime"
                        value={formData.sessionTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Session Link</label>
                    <input
                        type="url"
                        name="sessionLink"
                        value={formData.sessionLink}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Create Session
                </button>
            </form>
        </div>
    );
}

export default CreateSession;
