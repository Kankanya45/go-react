import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "animate.css";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(5);
  const [editingSubject, setEditingSubject] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [newSubjectData, setNewSubjectData] = useState({
    name: "",
    description: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deletingSubjectID, setDeletingSubjectID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = searchTerm
    ? searchResults.slice(indexOfFirstSubject, indexOfLastSubject)
    : subjects.slice(indexOfFirstSubject, indexOfLastSubject);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setEditedName(subject.Name);
    setEditedDescription(subject.Description);
    setEditModalIsOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingSubject) {
      const updatedSubject = {
        ...editingSubject,
        Name: editedName,
        Description: editedDescription,
      };

      try {
        const response = await fetch(
          `http://localhost:5000/subjects/${updatedSubject.ID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSubject),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update subject");
        }

        const updatedSubjectData = await response.json();
        const updatedSubjects = subjects.map((subject) =>
          subject.ID === updatedSubjectData.ID ? updatedSubjectData : subject
        );
        setSubjects(updatedSubjects);
        setEditingSubject(null);
        setEditedName("");
        setEditedDescription("");
        setEditModalIsOpen(false);
        toast.success("Subject updated successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5000/subjects/${ID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete subject");
      }
      const updatedSubjects = subjects.filter((subject) => subject.ID !== ID);
      setSubjects(updatedSubjects);
      setDeleteModalIsOpen(false);
      toast.success("Subject deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubjectData({ ...newSubjectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubjectData),
      });

      if (!response.ok) {
        throw new Error("Failed to add subject");
      }

      const subjectData = await response.json();
      setSubjects([...subjects, subjectData]);
      setNewSubjectData({ Name: "", Description: "" });
      setModalIsOpen(false);
      toast.success("Subject added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const results = subjects.filter((subject) =>
      subject.Name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4 bg-pink-100">
      <h1 className="text-3xl font-semibold mb-4 text-center">📝sᴜʙᴊᴇᴄᴛ ʟɪsᴛ</h1>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-4/5 mx-auto">
        <br />
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          />
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Add
          </button>
        </div>
        <br />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Menu
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSubjects.map((subject) => (
              <tr key={subject.ID} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{subject.Name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subject.Description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                    onClick={() => handleEdit(subject)}
                  >
                    Edit
                  </button>
                  <br />
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setDeletingSubjectID(subject.ID);
                      setDeleteModalIsOpen(true);
                    }}
                  >
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
        contentLabel="Add Subject"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4 text-pink-600">Add Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newSubjectData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newSubjectData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4 text-pink-600">Edit</h2>
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="edit-Name"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="edit-Name"
              name="edit-Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="edit-Description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="edit-Description"
              name="edit-Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded save-button"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setEditModalIsOpen(false);
              setEditedName("");
              setEditedDescription("");
            }}
          >
            Cancel
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        contentLabel="Confirm Delete"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
        <p>Are you sure want to delete?</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded confirm-button"
            onClick={() => handleDelete(deletingSubjectID)}
          >
            Confirm
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="mt-4">
        <ul className="flex justify-center">
          <li
            className={`${
              currentPage === 1 ? "pointer-events-none" : ""
            } px-3 py-1 bg-gray-200 rounded-l`}
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </li>
          {[...Array(Math.ceil(subjects.length / subjectsPerPage)).keys()].map(
            (number) => (
              <li
                key={number}
                onClick={() => paginate(number + 1)}
                className={`${
                  currentPage === number + 1
                    ? "bg-pink-500 text-white font-semibold"
                    : ""
                } px-3 py-1 cursor-pointer rounded`}
              >
                {number + 1}
              </li>
            )
          )}
          <li
            className={`${
              currentPage === Math.ceil(subjects.length / subjectsPerPage)
                ? "pointer-events-none"
                : ""
            } px-3 py-1 bg-gray-200 rounded-r`}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </li>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Subject;
