import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const userEmail = localStorage.getItem("email");
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    console.log("Logout successful");
    setIsLoggedIn(false);
    window.location.href = "/login";
    window.location.href = "/Register";
  };

  useEffect(() => {
    // Check login status on component mount
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <>
      <nav className="bg-pink-700 shadow-lg">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-4xl font-semibold whitespace-nowrap text-white">
             
            </span>
          </Link> 
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="text-white">
              {userEmail && <span>🍒 User: {userEmail}</span>}
            </div>
            {isLoggedIn ? (
              <button
                className="text-lg text-white bg-pink-300 hover:bg-pink-500 px-4 py-2 rounded-md transition duration-300 shadow-md"
                onClick={handleLogout}
              >
                ʟᴏɢᴏᴜᴛ
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg text-white bg-pink-300 hover:bg-pink-500 px-4 py-2 rounded-md transition duration-300 shadow-md"
                >
                  ʟᴏɢɪɴ
                </Link>
                <Link
                  to="/Register"
                  className="text-lg text-white bg-pink-300 hover:bg-pink-500 px-4 py-2 rounded-md transition duration-300 shadow-md"
                >
                  ʀᴇɢɪsᴛᴇʀ
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-opacity-50 bg-gray-50 dark:bg-pink-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-lg mr-4">
              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/User"
                      className="text-white hover:bg-pink-500 hover:text-white px-4 py-2 rounded-md transition duration-300 shadow-md"
                    >
                      ᴜsᴇʀ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/student"
                      className="text-white hover:bg-pink-500 hover:text-white px-4 py-2 rounded-md transition duration-300 shadow-md"
                    >
                      sᴛᴜᴅᴇɴᴛ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacher"
                      className="text-white hover:bg-pink-500 hover:text-white px-4 py-2 rounded-md transition duration-300 shadow-md"
                    >
                      ᴛᴇᴀᴄʜᴇʀ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/subject"
                      className="text-white hover:bg-pink-500 hover:text-white px-4 py-2 rounded-md transition duration-300 shadow-md"
                    >
                      sᴜʙᴊᴇᴄᴛ
                    </Link>
                  </li>
                  
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
