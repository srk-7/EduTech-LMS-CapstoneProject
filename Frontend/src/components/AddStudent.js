import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudentToClass } from '../services/teacherService';

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
            navigate(`/classes/${classId}`); // Redirect to the class page after adding the student
        } catch (error) {
            console.error('Error adding student:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <form onSubmit={handleAddStudent} className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Add Student to Class</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
                    Add Student
                </button>
            </form>
        </div>
    );
}

export default AddStudent;
