// Subject.js
import React, { useState, useEffect } from "react";

const Subject = ({ id }) => {
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        console.log("id from form =" + id);
        const response = await fetch(`http://localhost:5000/subjects/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data = " + JSON.stringify(data));
        setSubject(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading subject: {error}</p>;
  if (!subject) return <p>No subject found for ID {id}</p>;

  return (
    <div>
      <h2>Subject Details</h2>
      <p>
        <strong>ID:</strong> {subject.ID}
      </p>
      <p>
        <strong>Code:</strong> {subject.Code}
      </p>
      <p>
        <strong>Name:</strong> {subject.Name}
      </p>
      {/* Render other subject properties as needed */}
    </div>
  );
};

export default Subject;