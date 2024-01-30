import React, { useState, useEffect } from "react";
import Student from "../student";

const StudentsList = () => {
  const [students, setStudents] = useState([]); // State to store the items
  const [isLoading, setIsLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle any errors

  const [inputId, setInputId] = useState("");
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    console.log("Updated StudentId=" + studentId);
  }, [studentId]); // This effect will run whenever itemId changes

  const handleSubmit = (event) => {
    event.preventDefault();
    // print inputId to console
    console.log("inputId=" + inputId);
    setStudentId(Number(inputId)); // Convert inputId to a number
    console.log("itemId=" + studentId);
  };

  // Function to fetch items from the API
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data); // Update the state with the fetched items data into the items array
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {students.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.ID}>
                <td>{student.ID}</td>
                <td>{student.Code}</td>
                <td>{student.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />

      <form onSubmit={handleSubmit}>
        <label>
          Enter Subject ID:
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
      {studentId !== null && <Student id={studentId} />}
    </div>
  );
};

export default StudentsList;