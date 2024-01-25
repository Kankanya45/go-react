import React, { useState, useEffect } from "react";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]); // State to store the items
  const [isLoading, setIsLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle any errors

  // Function to fetch items from the API
  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubjects(data); // Update the state with the fetched items data into the items array
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h1>Subjects List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {subjects.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.ID}>
                <td>{subject.ID}</td>
                <td>{subject.Code}</td>
                <td>{subject.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubjectsList;