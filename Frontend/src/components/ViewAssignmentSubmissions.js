import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ViewAssignmentSubmissions() {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`/api/teachers/assignments/${assignmentId}/submissions`);
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* <h1 className="text-3xl font-bold mb-6">Submissions for Assignment {assignmentId}</h1> */}
            <h1 className="text-3xl font-bold mb-6">Submissions</h1>
            {submissions.length > 0 ? (
                <ul>
                    {submissions.map((submission) => (
                        <li key={submission.id} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{submission.studentName}</h2>
                            <p>Submitted at: {new Date(submission.submittedAt).toLocaleString()}</p>
                            <a href={submission.submissionLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                View Submission
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No submissions available for this assignment.</p>
            )}
        </div>
    );
}

export default ViewAssignmentSubmissions;
