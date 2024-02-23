import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "animate.css";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [currentPAge, setCurrentPAge] = useState(1);
  const [studentsPerPAge] = useState(5);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedAge, setEditedAge] = useState("");
  const [editedGrade, setEditedGrade] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Grade: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastStudent = currentPAge * studentsPerPAge;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPAge;
  const currentStudents = searchResults.length > 0 ? searchResults : students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pAgeNumber) => setCurrentPAge(pAgeNumber);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditedFirstName(student.FirstName);
    setEditedLastName(student.LastName);
    setEditedAge(student.Age);
    setEditedGrade(student.Grade);
    setEditModalIsOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingStudent) {
      const updatedStudent = {
        ...editingStudent,
        FirstName: editedFirstName,
        LastName: editedLastName,
        Age: parseInt(editedAge), // แปลงอายุเป็นชนิดข้อมูลจำนวนเต็ม
        Grade: editedGrade,
      };

      try {
        const response = await fetch(
          `http://localhost:5000/students/${updatedStudent.ID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudent),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update student");
        }

        const updatedStudentData = await response.json();
        const updatedStudents = students.map((student) =>
          student.ID === updatedStudentData.ID ? updatedStudentData : student
        );
        setStudents(updatedStudents);
        setEditingStudent(null);
        setEditedFirstName("");
        setEditedLastName("");
        setEditedAge(""); // เคลียร์ค่าอายุหลังจากแก้ไขเสร็จสิ้น
        setEditedGrade("");
        setEditModalIsOpen(false);
        toast.success("Student data updated successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/students/${deletingStudentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      const updatedStudents = students.filter(
        (student) => student.ID !== deletingStudentId
      );
      setStudents(updatedStudents);
      setDeleteModalIsOpen(false);
      toast.success("Student data deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setNewStudentData({ ...newStudentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: newStudentData.FirstName,
          LastName: newStudentData.LastName,
          Age: parseInt(newStudentData.Age), // แปลงอายุเป็นชนิดข้อมูลจำนวนเต็ม
          Grade: newStudentData.Grade,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const studentData = await response.json();
      setStudents([...students, studentData]);
      setNewStudentData({ FirstName: "", LastName: "", Age: "", Grade: "" });
      setModalIsOpen(false);
      toast.success("Student data added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const results = students.filter((student) =>
      student.FirstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
      student.LastName.toLowerCase().includes(event.target.value.toLowerCase()) ||
      student.Age.toString().toLowerCase().includes(event.target.value.toLowerCase()) ||
      student.Grade.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="p-4 bg-pink-100">
      <h1 className="text-3xl font-semibold mb-4 text-center">🎓sᴛᴜᴅᴇɴᴛ ʟɪsᴛ</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-4/5 mx-auto">
        <br />
        <div className="flex justify-between items-center">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={openModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add
            </button>
          </div>
        </div>
        <br />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Menu
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student.ID} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.FirstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.LastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.Age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.Grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                    onClick={() => handleEdit(student)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414zM4 10.5a.5.5 0 011 0v3.793l3.146-3.147a1 1 0 111.415 1.414L6.914 16h-3.79a.5.5 0 010-1h3.086l3.147-3.147a1 1 0 111.414 1.414L5.414 18H3.5a.5.5 0 010-1h1.914l3.146-3.146V10.5a.5.5 0 011 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Edit
                  </button>
                  <br />
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={() => {
                      setDeletingStudentId(student.ID);
                      setDeleteModalIsOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a2 2 0 012-2h4a2 2 0 012 2h2a1 1 0 011 1v1a2 2 0 01-2 2H3a2 2 0 01-2-2V3a1 1 0 011-1h2zm4 2H8a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1zm-4 6a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm8 7a1 1 0 01-1 1H4a1 1 0 01-1-1V7h14v10zM7 9a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Student"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="FirstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              value={newStudentData.FirstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="LastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={newStudentData.LastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="Age" className="text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="Age"
              name="Age"
              value={newStudentData.Age}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="Grade"
              className="text-sm font-medium text-gray-700"
            >
              Grade
            </label>
            <input
              type="text"
              id="Grade"
              name="Grade"
              value={newStudentData.Grade}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex justify-end items-center space-x-4">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit Student"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
        <form className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="editedFirstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="editedFirstName"
              name="editedFirstName"
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="editedLastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="editedLastName"
              name="editedLastName"
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="editedAge"
              className="text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="editedAge"
              name="editedAge"
              value={editedAge}
              onChange={(e) => setEditedAge(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="editedGrade"
              className="text-sm font-medium text-gray-700"
            >
              Grade
            </label>
            <input
              type="text"
              id="editedGrade"
              name="editedGrade"
              value={editedGrade}
              onChange={(e) => setEditedGrade(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex justify-end items-center space-x-4">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditModalIsOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        contentLabel="Delete Student"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Delete Student</h2>
        <p>Are you sure you want to delete this student?</p>
        <div className="flex justify-end items-center space-x-4 mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setDeleteModalIsOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Student;
