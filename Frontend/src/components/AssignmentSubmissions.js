import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmissionsByAssignmentId } from '../services/teacherService';

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
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Submissions for Assignment {assignmentId}</h1>
            {submissions.length > 0 ? (
                <ul>
                    {submissions.map((submission) => (
                        <li key={submission.id} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                            <p>Student ID: {submission.studentId}</p>
                            <p>Submission Link: <a href={submission.submissionLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{submission.submissionLink}</a></p>
                            <p>Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No submissions available.</p>
            )}
        </div>
    );
}

export default AssignmentSubmissions;
