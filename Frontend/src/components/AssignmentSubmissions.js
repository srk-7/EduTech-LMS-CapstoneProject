import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmissionsByAssignmentId } from '../services/teacherService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExternalLinkAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';

function AssignmentSubmissions() {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const submissionsData = await getSubmissionsByAssignmentId(assignmentId);
                setSubmissions(submissionsData);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
            <div className="mb-6">
                    <BackButton />
            </div>
            <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Assignment Submissions</h1>
            {submissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map((submission) => (
                        <div key={submission.id} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                            <p className="text-xl font-bold mb-2 text-indigo-700 flex items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                Student ID: {submission.studentId}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center mb-4">
                                <FontAwesomeIcon icon={faClock} className="mr-2" />
                                Submitted At: {new Date(submission.submittedAt).toLocaleString()}
                            </p>
                            <a
                                href={submission.submissionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out flex items-center"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                                View Submission
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No submissions available.</p>
            )}
        </div>
    );
}

export default AssignmentSubmissions;
