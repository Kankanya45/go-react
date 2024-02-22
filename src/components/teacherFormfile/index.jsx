import React, { useState } from 'react';
import Teacher from '../Teacher'; // แก้ไขตำแหน่งของไฟล์ Teacher.jsx ตามโครงสร้างของโฟลเดอร์ของคุณ

const ItemFormFindTea = () => {
    const [inputId, setInputId] = useState('');
    const [teacherId, setTeacherId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setTeacherId(inputId.trim() !== '' ? parseInt(inputId) : null);
        setInputId(''); // Clear input field after form submission
    };

    return (
        <div>
            <h1>Find Teacher</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Teacher ID:
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {teacherId !== null && <Teacher id={teacherId} />}
        </div>
    );
};

export default ItemFormFindTea;
