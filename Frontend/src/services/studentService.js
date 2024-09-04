// Fetch materials for the student
export const getMaterialsForStudent = async (studentId) => {
    try {
        const response = await fetch(`http://localhost:8082/api/students/${studentId}/materials`);
        
        // Log the raw response object
        console.log('Raw response:', response);
  
        if (!response.ok) {
            throw new Error('Failed to fetch materials');
        }
  
        // Parse the response as JSON
        const data = await response.json();
        
        // Log the parsed JSON data
        console.log('Parsed JSON data:', data);
        
        return data;
    } catch (error) {
        console.error('Error fetching materials:', error);
        return []; // Return an empty array on error
    }
  };
  

// Fetch videos for the student
export const getVideosForStudent = async (studentId) => {
  try {
      const response = await fetch(`http://localhost:8082/api/students/${studentId}/videos`);
      if (!response.ok) {
          throw new Error('Failed to fetch videos');
      }
      return response.json(); // Parse the JSON response
  } catch (error) {
      console.error('Error fetching videos:', error);
      return []; // Return an empty array on error
  }
};

// Fetch assignments for the student
export const getAssignmentsForStudent = async (studentId) => {
  try {
      const response = await fetch(`http://localhost:8082/api/students/${studentId}/assignments`);
      if (!response.ok) {
          throw new Error('Failed to fetch assignments');
      }
      return response.json(); // Parse the JSON response
  } catch (error) {
      console.error('Error fetching assignments:', error);
      return []; // Return an empty array on error
  }
};

// Fetch sessions for the student
export const getSessionsForStudent = async (studentId) => {
  try {
      const response = await fetch(`http://localhost:8082/api/students/${studentId}/sessions`);
      if (!response.ok) {
          throw new Error('Failed to fetch sessions');
      }
      return response.json(); // Parse the JSON response
  } catch (error) {
      console.error('Error fetching sessions:', error);
      return []; // Return an empty array on error
  }
};

export const submitAssignment = async (assignmentId, submission) => {
    try {
        const response = await fetch(`http://localhost:8081/api/teachers/assignments/${assignmentId}/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        });

        if (!response.ok) {
            throw new Error('Failed to submit assignment');
        }

        return response.json();
    } catch (error) {
        console.error('Error submitting assignment:', error);
        throw error;
    }
};
