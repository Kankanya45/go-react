import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "animate.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [newUserData, setNewUserData] = useState({ name: "", email: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false); // New state for edit modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false); // New state for delete modal
  const [deletingUserId, setDeletingUserId] = useState(null); // New state to track the user id to be deleted

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedName(user.Name);
    setEditedEmail(user.Email);
    setEditModalIsOpen(true); // Open edit modal
  };

  const handleSaveEdit = async () => {
    if (editingUser) {
      const updatedUser = {
        ...editingUser,
        Name: editedName,
        Email: editedEmail,
      };

      // Check if the edited email already exists in the database
      const isDuplicateEmail = users.some(
        (user) => user.ID !== updatedUser.ID && user.Email === editedEmail
      );

      if (isDuplicateEmail) {
        toast.error("This email is already in the system.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/users/${updatedUser.ID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        const updatedUserData = await response.json();
        const updatedUsers = users.map((user) =>
          user.ID === updatedUserData.ID ? updatedUserData : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
        setEditedName("");
        setEditedEmail("");
        setEditModalIsOpen(false); // Close edit modal
        toast.success("Data editing complete"); // Add autoClose option to toast
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${deletingUserId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      const updatedUsers = users.filter((user) => user.ID !== deletingUserId);
      setUsers(updatedUsers);
      setDeleteModalIsOpen(false); // Close delete modal
      toast.success("User data has been successfully deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email already exists in the database
    const isDuplicateEmail = users.some(
      (user) => user.Email === newUserData.email
    );

    if (isDuplicateEmail) {
      toast.error("This email is already in the system.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const userData = await response.json();
      setUsers([...users, userData]);
      setNewUserData({ name: "", email: "" });
      setModalIsOpen(false); // Close add modal
      toast.success("User information added successfully.");
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

  return (
    <div className="p-4 bg-pink-100">
      <h1 className="text-3xl font-semibold mb-4 text-center">
      👨‍🦰ᴜsᴇʀ ʟɪsᴛ
      </h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-4/5 mx-auto">
        <br />
        <div className="flex justify-end">
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
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
        <br />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((row) => (
              <tr key={row.ID} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{row.Name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.Email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                <button
  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
  onClick={() => handleEdit(row)}
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
    setDeletingUserId(row.ID);
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
        contentLabel="Add information
        "
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Add
</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              
              value={newUserData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              
              value={newUserData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
             className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Add
          </button>
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
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="edit-name"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="edit-name"
              name="edit-name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="edit-email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="edit-email"
              name="edit-email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setEditModalIsOpen(false);
              setEditedName("");
              setEditedEmail("");
            }}
          >
            Cancel
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        contentLabel="ยืนยันการลบข้อมูล"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
        <p>Are you sure want to delete?</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleDelete}
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
    <li>
      <button
        className={`${
          currentPage === 1
            ? "bg-pink-100 text-gray-800"
            : "bg-pink-300 hover:bg-pink-400 text-white"
        } font-semibold py-2 px-4 mx-1 rounded`}
        onClick={() => paginate(currentPage - 1)} // เปลี่ยน currentPage - 1 เพื่อให้ย้อนกลับหน้า
        disabled={currentPage === 1} // ปิดปุ่มถ้าอยู่ที่หน้าแรก
      >
        Previous
      </button>
    </li>
    {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
      (_, index) => (
        <li key={index}>
          <button
            className={`${
              currentPage === index + 1
                ? "bg-pink-300 text-white"
                : "bg-pink-100 hover:bg-pink-200 text-gray-800"
            } font-semibold py-2 px-4 mx-1 rounded`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      )
    )}
    <li>
      <button
        className={`${
          currentPage === Math.ceil(users.length / usersPerPage)
            ? "bg-pink-100 text-gray-800"
            : "bg-pink-300 hover:bg-pink-400 text-white"
        } font-semibold py-2 px-4 mx-1 rounded`}
        onClick={() => paginate(currentPage + 1)} // เปลี่ยน currentPage + 1 เพื่อให้เลื่อนหน้าต่อไป
        disabled={currentPage === Math.ceil(users.length / usersPerPage)} // ปิดปุ่มถ้าอยู่ที่หน้าสุดท้าย
      >
        Next
      </button>
    </li>
  </ul>
</div>
<ToastContainer />


    </div>
  );
};

export default User;