import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { getMaterialsForStudent } from '../services/studentService';
import { useParams } from 'react-router-dom';

function StudentMaterials() {
    const [materials, setMaterials] = useState([]);
    const { studentId } = useParams();

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const fetchedMaterials = await getMaterialsForStudent(studentId);
                console.log('Fetched materials:', fetchedMaterials);
                
                if (fetchedMaterials && fetchedMaterials.materials) {
                    setMaterials(fetchedMaterials.materials);
                } else {
                    setMaterials([]);
                }
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        if (studentId) {
            fetchMaterials();
        }
    }, [studentId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                {/* <h1 className="text-3xl font-bold mb-6">Materials for Student {studentId}</h1> */}
                <h1 className="text-3xl font-bold mb-6">Materials for Student</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {materials.length > 0 ? (
                        <ul>
                            {materials.map((material) => (
                                <li key={material.materialId} className="mb-4">
                                    <h2 className="text-xl font-semibold">{material.title}</h2>
                                    <p>{material.description}</p>
                                    <a href={material.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View Material
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No materials available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentMaterials;
