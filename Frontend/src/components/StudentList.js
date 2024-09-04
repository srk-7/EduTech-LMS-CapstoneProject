// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getStudentsByClassId } from '../services/teacherService'; // Implement this service function

// function StudentList() {
//     const { classId } = useParams();
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const response = await getStudentsByClassId(classId);
//                 setStudents(response);
//             } catch (error) {
//                 console.error('Error fetching students:', error);
//             }
//         };

//         fetchStudents();
//     }, [classId]);

//     return (
//         <div className="p-8 bg-gray-100 min-h-screen">
//             <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Students</h1>
//             {students.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {students.map((student) => (
//                         <div key={student.studentId} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
//                             <div className="flex flex-col items-center">
//                                 <div className="mb-4">
//                                     {/* Placeholder for student avatar */}
//                                     <img
//                                         src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} // Generate avatar
//                                         alt={`${student.name}'s avatar`}
//                                         className="w-24 h-24 rounded-full shadow-lg"
//                                     />
//                                 </div>
//                                 <h2 className="text-xl font-semibold mb-1 text-blue-600">{student.name}</h2>
//                                 <p className="text-gray-600 mb-2">Email: {student.email}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-600">No students found in this class.</p>
//             )}
//         </div>
//     );
// }

// export default StudentList;




import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentsByClassId, deleteStudent } from '../services/teacherService'; // Make sure deleteStudent service is implemented
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the delete icon

function StudentList() {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudentsByClassId(classId);
                setStudents(response);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [classId]);

    const handleDelete = async (studentId) => {
        try {
            await deleteStudent(studentId); // Call the deleteStudent service
            setStudents(students.filter(student => student.studentId !== studentId)); // Remove student from state
            alert('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Failed to delete student.');
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Students</h1>
            {students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map((student) => (
                        <div key={student.studentId} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl relative">
                            {/* Delete Button in the top-right corner */}
                            <button
                                onClick={() => handleDelete(student.studentId)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    {/* Placeholder for student avatar */}
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} // Generate avatar
                                        alt={`${student.name}'s avatar`}
                                        className="w-24 h-24 rounded-full shadow-lg"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold mb-1 text-blue-600">{student.name}</h2>
                                <p className="text-gray-600 mb-2">Email: {student.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No students found in this class.</p>
            )}
        </div>
    );
}

export default StudentList;
