import React from "react";
import "./App.css";

// Importing components from specified paths.
import ItemList from "./components/ItemList";
import Student from "./components/StudentsList";
import Subject from "./components/SubjectsList";

import ItemFormFind from "./components/itemFormfile";
import ItemFormFindStu from "./components/StudentFormfile"
import ItemFormFindSub from "./components/SubjectFormfile"


// The main function component for the application.
function App() {
  return (
    <div className="app-container">
      <h1 className="app-header">My Front-End</h1>

      <div className="card-container">
        <div className="card">
          <h2>Items List</h2>
          <ItemList />
          <ItemFormFind />
        </div>

        <div className="card">
          <h2>Subjects</h2>
          <Subject />
          <ItemFormFindSub />
        </div>

        <div className="card">
          <h2>Students</h2>
          <Student />
          <ItemFormFindStu />
        </div>
      </div>
    </div>
  );
}

export default App;