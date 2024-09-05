import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialsByClassId } from '../services/teacherService';
import Navbar from './Navbar'; // Assuming you want a navbar as well

function ViewMaterials() {
    const { classId } = useParams();
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await getMaterialsByClassId(classId);
                setMaterials(response);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterials();
    }, [classId]);

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Materials</h1>
                {materials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {materials.map((material) => (
                            <div key={material.materialId} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                                <h2 className="text-2xl font-bold mb-2 text-indigo-700">{material.title}</h2>
                                <p className="text-gray-700 mb-4">{material.description}</p>
                                <a
                                    href={material.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
                                >
                                    View Material
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No materials available for this class.</p>
                )}
            </div>
        </>
    );
}

export default ViewMaterials;
