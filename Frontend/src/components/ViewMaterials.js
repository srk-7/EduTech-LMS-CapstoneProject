import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialsByClassId, deleteMaterial } from '../services/teacherService';
import Navbar from './Navbar';
import BackButton from './BackButton'; // Import BackButton
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLink, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ViewMaterials() {
    const { classId } = useParams();
    const [materials, setMaterials] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);

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

    const handleDeleteClick = (materialId) => {
        setMaterialToDelete(materialId); // Set the material ID to be deleted
        setShowConfirmation(true); // Show the confirmation modal
    };

    const confirmDelete = async () => {
        if (materialToDelete) {
            try {
                await deleteMaterial(materialToDelete);
                setMaterials(materials.filter(material => material.materialId !== materialToDelete)); // Remove the deleted material from the state
                setShowConfirmation(false); // Hide the confirmation modal
            } catch (error) {
                console.error('Error deleting material:', error);
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false); // Hide the confirmation modal
        setMaterialToDelete(null); // Reset the material to delete
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                {/* Add the BackButton here */}
                <div className="mb-6">
                    <BackButton />
                </div>

                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    <FontAwesomeIcon icon={faBook} className="mr-2" /> Materials
                </h1>
                {materials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {materials.map((material) => (
                            <div
                                key={material.materialId}
                                className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative"
                            >
                                <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center">
                                    <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-600" />
                                    {material.title}
                                </h2>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {material.description || 'No description available'}
                                </p>
                                {material.link && (
                                    <a
                                        href={material.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out flex items-center"
                                    >
                                        <FontAwesomeIcon icon={faLink} className="mr-2" />
                                        View Material
                                    </a>
                                )}

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteClick(material.materialId)}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No materials available for this class.</p>
                )}

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this material?</h3>
                            <div className="flex justify-end">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700 transition duration-200 ease-in-out"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ViewMaterials;
