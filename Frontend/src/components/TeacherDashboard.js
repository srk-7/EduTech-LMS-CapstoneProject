// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getClassesByTeacherId, createClass, getStudentCountByClassId } from '../services/teacherService';
// import Navbar from './Navbar';

// function TeacherDashboard() {
//     const [classes, setClasses] = useState([]);
//     const [className, setClassName] = useState('');
//     const [classDescription, setClassDescription] = useState('');
//     const navigate = useNavigate();
//     const teacherId = localStorage.getItem('teacherId');

//     useEffect(() => {
//         const fetchClasses = async () => {
//             try {
//                 const response = await getClassesByTeacherId(teacherId);
//                 const classesWithCounts = await Promise.all(response.map(async (classItem) => {
//                     const studentCount = await getStudentCountByClassId(classItem.classId);
//                     return { ...classItem, studentCount };
//                 }));
//                 setClasses(classesWithCounts);
//             } catch (error) {
//                 console.error('Error fetching classes:', error);
//             }
//         };

//         if (teacherId) {
//             fetchClasses();
//         } else {
//             navigate('/register-teacher');
//         }
//     }, [teacherId, navigate]);

//     const handleClassClick = (classId) => {
//         // Store the selected classId in localStorage
//         localStorage.setItem('classId', classId);
//         navigate(`/classes/${classId}`); // Navigate to the selected class dashboard
//     };

//     const handleCreateClass = async (e) => {
//         e.preventDefault();
//         try {
//             const newClass = { name: className, description: classDescription };
//             const createdClass = await createClass(teacherId, newClass);
//             setClasses([...classes, createdClass]); // Add the new class to the list
//             setClassName(''); // Clear input fields
//             setClassDescription('');
//         } catch (error) {
//             console.error('Error creating class:', error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />
//             <div className="p-8">
//                 <h1 className="text-3xl font-bold mb-6">My Classes</h1>
//                 <form onSubmit={handleCreateClass} className="mb-8">
//                     <input
//                         type="text"
//                         placeholder="Class Name"
//                         value={className}
//                         onChange={(e) => setClassName(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded-lg"
//                         required
//                     />
//                     <textarea
//                         placeholder="Class Description"
//                         value={classDescription}
//                         onChange={(e) => setClassDescription(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded-lg"
//                         required
//                     ></textarea>
//                     <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
//                         Create Class
//                     </button>
//                 </form>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {classes.map((classItem) => (
//                         <div
//                             key={classItem.classId}
//                             className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
//                             onClick={() => handleClassClick(classItem.classId)} // Handle class click
//                         >
//                             <h2 className="text-xl font-semibold mb-2">{classItem.name}</h2>
//                             <p className="text-gray-700">{classItem.description}</p>
//                             <p className="text-gray-500">Students: {classItem.studentCount}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TeacherDashboard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClassesByTeacherId, createClass, getStudentCountByClassId } from '../services/teacherService';
import Navbar from './Navbar';

function TeacherDashboard() {
    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState('');
    const [classDescription, setClassDescription] = useState('');
    const navigate = useNavigate();
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await getClassesByTeacherId(teacherId);
                const classesWithCounts = await Promise.all(response.map(async (classItem) => {
                    const studentCount = await getStudentCountByClassId(classItem.classId);
                    return { ...classItem, studentCount };
                }));
                setClasses(classesWithCounts);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        if (teacherId) {
            fetchClasses();
        } else {
            navigate('/register-teacher');
        }
    }, [teacherId, navigate]);

    const handleClassClick = (classId) => {
        localStorage.setItem('classId', classId);
        navigate(`/classes/${classId}`);
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            const newClass = { name: className, description: classDescription };
            const createdClass = await createClass(teacherId, newClass);
            setClasses([...classes, createdClass]);
            setClassName('');
            setClassDescription('');
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <Navbar />
            <div className="p-8 max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-600">My Classes</h1>
                <form onSubmit={handleCreateClass} className="mb-10 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-500">Create a New Class</h2>
                    <input
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <textarea
                        placeholder="Class Description"
                        value={classDescription}
                        onChange={(e) => setClassDescription(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                    >
                        Create Class
                    </button>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((classItem) => (
                        <div
                            key={classItem.classId}
                            className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                            onClick={() => handleClassClick(classItem.classId)}
                        >
                            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{classItem.className}</h2>
                            <p className="text-gray-700 mb-4">{classItem.description}</p>
                            <p className="text-indigo-500 font-medium">Students: {classItem.studentCount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
