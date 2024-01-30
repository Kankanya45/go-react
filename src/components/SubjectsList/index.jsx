import React, { useState, useEffect } from "react";
import Item from "../subject"; // Import the Item component

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputId, setInputId] = useState("");
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    console.log("Updated itemId=" + itemId);
  }, [itemId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inputId=" + inputId);
    setItemId(Number(inputId)); // Convert inputId to a number
    console.log("itemId=" + itemId);
    setInputId(""); // Clear input after submission
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubjects(data);
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
      <br />

      <form onSubmit={handleSubmit}>
        <label>
          Enter Item ID:
          <input
            type="number"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* Render the Item component if itemId is not null */}
      {itemId !== null && <Item id={itemId} />}
    </div>
  );
};

export default SubjectsList;