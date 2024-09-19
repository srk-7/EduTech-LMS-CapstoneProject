// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import logo from '../assets/logo.png'; // Import the logo from the assets folder

// function LoginTeacher() {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState(null); // For handling errors
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await fetch('http://localhost:8081/api/teachers/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error('Invalid email or password');
//             }

//             const teacher = await response.json();
//             // Store teacher info in localStorage for later use
//             localStorage.setItem('teacherId', teacher.teacherId);
//             localStorage.setItem('teacherName', teacher.name);

//             // Show success toast
//             toast.success('Login successful! Redirecting...');
            
//             // Redirect to the teacher's dashboard after a short delay
//             setTimeout(() => {
//                 navigate('/teacher-dashboard');
//             }, 1500); // 1.5 second delay

//         } catch (error) {
//             // Show error toast
//             toast.error(error.message || 'Login failed');
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <div className="flex justify-center mb-6">
//                     <img src={logo} alt="EduTech LMS Logo" className="max-w-full h-auto" style={{ maxWidth: '150px' }} />
//                 </div>
//                 <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login as Teacher</h2>
//                 {error && (
//                     <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4">
//                         {error}
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-700 font-semibold mb-2">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-gray-700 font-semibold mb-2">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default LoginTeacher;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import logo from '../assets/logo.png'; // Import the logo from the assets folder

function LoginTeacher() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null); // For handling errors
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:8081/api/teachers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const data = await response.json();
            const { token, user } = data;

            // Store the JWT token and teacher info in localStorage
            localStorage.setItem('token', token); // Store the token for later API requests
            localStorage.setItem('teacherId', user.teacherId);
            localStorage.setItem('teacherName', user.name);

            // Show success toast
            toast.success('Login successful! Redirecting...');
            
            // Redirect to the teacher's dashboard after a short delay
            setTimeout(() => {
                navigate('/teacher-dashboard');
            }, 1500); // 1.5 second delay

        } catch (error) {
            // Show error toast
            toast.error(error.message || 'Login failed');
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="EduTech LMS Logo" className="max-w-full h-auto" style={{ maxWidth: '150px' }} />
                </div>
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login as Teacher</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
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
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginTeacher;
