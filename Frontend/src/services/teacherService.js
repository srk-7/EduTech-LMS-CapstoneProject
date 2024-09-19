export const createTeacher = async (teacher) => {
    const response = await fetch('http://localhost:8081/api/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
    });
  
    if (!response.ok) {
        throw new Error('Failed to register teacher');
    }
  
    return response.json();  // Return the response data as JSON
  };
  
  
  export const createClass = async (teacherId, classObj) => {
    const response = await fetch(`http://localhost:8081/api/teachers/${teacherId}/classes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classObj),
    });
    console.log(response);
  
    if (!response.ok) {
        throw new Error('Failed to create class');
    }
  
    return response.json();
  };
  
  export const getClassesByTeacherId = async (teacherId) => {
    const response = await fetch(`http://localhost:8081/api/teachers/${teacherId}/classes`);
  
    if (!response.ok) {
        throw new Error('Failed to fetch classes');
    }
  
    return response.json();
  };
  
  export const addStudentToClass = async (classId, student) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/students`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(student),
      });
  
      if (!response.ok) {
          throw new Error('Failed to add student');
      }
  
      return response.json();
  };
  
  export const getStudentCountByClassId = async (classId) => {
      const response = await fetch(`http://localhost:8082/api/students/count/${classId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch student count');
      }
      return response.json();
  };
  
  export const getAssignmentsByClassId = async (classId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/assignments`);
      if (!response.ok) {
          throw new Error('Failed to fetch assignments');
      }
      return response.json();
  };
  
  
  export const createAssignment = async (classId, assignmentData) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/assignments`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(assignmentData),
      });
  
      if (!response.ok) {
          throw new Error('Failed to create assignment');
      }
  
      return response.json();
  };
  
  export const getStudentsByClassId = async (classId) => {
      const response = await fetch(`http://localhost:8082/api/students/class/${classId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch students');
      }
      return response.json();
  };
  
  export const createMaterial = async (classId, materialData) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/materials`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(materialData),
      });
  
      if (!response.ok) {
          throw new Error('Failed to create material');
      }
  
      return response.json();
  };
  
  export const getMaterialsByClassId = async (classId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/materials`);
      if (!response.ok) {
          throw new Error('Failed to fetch materials');
      }
      return response.json();
  };
  
  export const createVideo = async (classId, videoData) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/videos`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoData),
      });
  
      if (!response.ok) {
          throw new Error('Failed to create video');
      }
  
      return response.json();
  };
  
  export const getVideosByClassId = async (classId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/videos`);
      if (!response.ok) {
          throw new Error('Failed to fetch videos');
      }
      return response.json();
  };
  
  export const createSession = async (classId, sessionData) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/sessions`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionData),
      });
  
      if (!response.ok) {
          throw new Error('Failed to create session');
      }
  
      return response.json();
  };
  
  export const getSessionsByClassId = async (classId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/classes/${classId}/sessions`);
      if (!response.ok) {
          throw new Error('Failed to fetch sessions');
      }
      return response.json();
  };
  
  export const submitAssignment = async (studentId, assignmentId, submission) => {
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
    
    export const getSubmissionsByAssignmentId = async (assignmentId) => {
      try {
          const response = await fetch(`http://localhost:8081/api/teachers/assignments/${assignmentId}/submissions`);
          if (!response.ok) {
              throw new Error('Failed to fetch submissions');
          }
          return response.json();
      } catch (error) {
          console.error('Error fetching submissions:', error);
          return [];
      }
  };
  
  export const deleteStudent = async (studentId) => {
      const response = await fetch(`http://localhost:8082/api/students/${studentId}`, {
          method: 'DELETE',
      });
      if (!response.ok) {
          throw new Error('Failed to delete student');
      }
  };
  
  export const deleteMaterial = async (materialId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/materials/${materialId}`, {
          method: 'DELETE',
      });
    
      if (!response.ok) {
          throw new Error('Failed to delete material');
      }
  };
  
    export const deleteSession = async (sessionId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/sessions/${sessionId}`, {
          method: 'DELETE',
      });
    
      if (!response.ok) {
          throw new Error('Failed to delete session');
      }
  };
  
  
  export const deleteVideo = async (videoId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/videos/${videoId}`, {
          method: 'DELETE',
      });
    
      if (!response.ok) {
          throw new Error('Failed to delete video');
      }
  };
  
  export const deleteAssignment = async (assignmentId) => {
      const response = await fetch(`http://localhost:8081/api/teachers/assignments/${assignmentId}`, {
          method: 'DELETE',
      });
    
      if (!response.ok) {
          throw new Error('Failed to delete assignment');
      }
    };
    