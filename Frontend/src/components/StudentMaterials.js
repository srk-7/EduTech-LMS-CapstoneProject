import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialsForStudent } from '../services/studentService';
import Navbar from './Navbar';
import BackButton from './BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';

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
                <div className="mb-6">
                    <BackButton />
                </div>
                <h1 className="text-3xl font-bold mb-6 flex items-center text-blue-600">
                    <FontAwesomeIcon icon={faBook} className="mr-3 text-blue-600" />
                    Your Materials
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.length > 0 ? (
                        materials.map((material) => (
                            <div key={material.materialId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 flex items-center">
                                    <FontAwesomeIcon icon={faBook} className="mr-2 text-indigo-600" />
                                    {material.title}
                                </h2>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {material.description}
                                </p>
                                <a href={material.link} target="_blank" rel="noopener noreferrer" className="w-full block bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition duration-200 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faLink} className="mr-2" />
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
