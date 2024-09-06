import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { getMaterialsForStudent } from '../services/studentService';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

function StudentMaterials() {
    const [materials, setMaterials] = useState([]);
    const { studentId } = useParams();

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const fetchedMaterials = await getMaterialsForStudent(studentId);
                setMaterials(fetchedMaterials?.materials || []);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterials();
    }, [studentId]);

    return (
        <>
        <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
                {/* Add margin bottom to the BackButton */}
                <div className="mb-6">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold mb-6 flex items-center">
                    <FontAwesomeIcon icon={faBook} className="mr-3 text-red-600" />
                    Materials for Student
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.length > 0 ? (
                        materials.map((material) => (
                            <div key={material.materialId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold text-blue-600 mb-2">{material.title}</h2>
                                <p className="text-gray-700 mb-4">{material.description}</p>
                                <a href={material.link} target="_blank" rel="noopener noreferrer" className="w-full block bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition duration-200">
                                    View Material
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No materials available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentMaterials;
