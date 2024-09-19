import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudentToClass } from '../services/teacherService';
import { FaUserPlus, FaEnvelope, FaLock } from 'react-icons/fa'; // Icons for the form
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BackButton from './BackButton';

function AddStudent() {
    const { classId } = useParams(); // Get classId from the URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const newStudent = { name, email, pwd: password };
            await addStudentToClass(classId, newStudent);
            toast.success('Student added successfully!');
            setTimeout(() => {
                navigate(`/classes/${classId}`); // Redirect to the class page after adding the student
            }, 2000);
        } catch (error) {
            console.error('Error adding student:', error);
            toast.error('Failed to add student. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-400 flex justify-center items-center">
            <ToastContainer />

            <form onSubmit={handleAddStudent} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="mb-6">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Add Student to Class</h1>

                {/* Name Input */}
                <div className="mb-4 flex items-center border-b-2 border-indigo-600 py-2">
                    <FaUserPlus className="text-indigo-600 mr-3" />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Student Name"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4 flex items-center border-b-2 border-indigo-600 py-2">
                    <FaEnvelope className="text-indigo-600 mr-3" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Student Email"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4 flex items-center border-b-2 border-indigo-600 py-2">
                    <FaLock className="text-indigo-600 mr-3" />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Password"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-300">
                    Add Student
                </button>
            </form>
        </div>
    );
}

export default AddStudent;
