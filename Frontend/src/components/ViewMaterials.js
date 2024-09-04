import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialsByClassId } from '../services/teacherService';

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
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* <h1 className="text-3xl font-bold mb-6">Materials for Class {classId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Materials</h1>
            {materials.length > 0 ? (
                <ul>
                    {materials.map((material) => (
                        <li key={material.materialId} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{material.title}</h2>
                            <p>{material.description}</p>
                            <a href={material.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View Material</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No materials available for this class.</p>
            )}
        </div>
    );
}

export default ViewMaterials;
