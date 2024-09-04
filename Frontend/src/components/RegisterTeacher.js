// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createTeacher } from '../services/teacherService';

// function RegisterTeacher() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const newTeacher = { name, email, pwd: password };
//             const response = await createTeacher(newTeacher);
//             const teacherId = response.teacherId;  // Get the generated teacherId from the response
//             localStorage.setItem('teacherId', teacherId);  // Store teacherId
//             navigate('/teacher-dashboard');  // Redirect to the dashboard
//         } catch (error) {
//             console.error('Error registering teacher:', error);
//             // Handle error (e.g., show an error message)
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//             <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-bold mb-6">Register as Teacher</h1>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-lg"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default RegisterTeacher;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png'; // Import the logo from the assets folder
import { createTeacher } from '../services/teacherService';

function RegisterTeacher() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newTeacher = { name, email, pwd: password };
            const response = await createTeacher(newTeacher);
            const teacherId = response.teacherId; // Get the generated teacherId from the response
            localStorage.setItem('teacherId', teacherId); // Store teacherId

            toast.success('Registration successful!');
            setTimeout(() => navigate('/teacher-dashboard'), 2000); // Redirect to the dashboard after a delay
        } catch (error) {
            toast.error('Registration failed');
            console.error('Error registering teacher:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="EduTech LMS Logo" className="max-w-full h-auto" style={{ maxWidth: '150px' }} />
                </div>
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register as Teacher</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RegisterTeacher;
