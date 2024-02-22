import React, { useState, useEffect } from 'react';

const Teacher = ({ id }) => {
    const [teacher, setTeacher] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await fetch(`http://localhost:5000/teachers/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTeacher(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!teacher) return <p>No teacher found for ID {id}</p>;

    return (
        <div>
            <h2>Teacher Details</h2>
            <p><strong>ID:</strong> {teacher.ID}</p>
            <p><strong>First Name:</strong> {teacher.FirstName}</p>
            <p><strong>Last Name:</strong> {teacher.LastName}</p>
            <p><strong>Subjects:</strong> {teacher.Subjects}</p>
        </div>
    );
};

export default Teacher;
