import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.css";

import ItemsList from './components/Items';
import Students from './components/Students';
import Subjects from './components/Subjects';
import ItemFormFind from './components/ItemFormfile';
import ItemFormFindStu from './components/StudentFormfile';
import ItemFormFindSub from './components/SubjectFormfile';
import SignIn from './components/SignIn';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
     <Router>
      <div>
        <h3>My Project</h3>
        <nav>
            <Link to="/">หน้าหลัก</Link>
            <hr />
            {!isLoggedIn && (
               <>
               <Link to="/signin">เข้าสู่ระบบ</Link>
               <Link to="/Register">ลงทะเบียน</Link>
             </>
            )}
        </nav>

        {/* Add the Routes component to the App */}
        {/* <> xxx </>คือตำแหน่งที่ข้อมูลจาก Component คือค่ามา */}
        <Routes>
          <Route path="/signin" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/" element={
            <> 
              <div className="card">
                {isLoggedIn ? (
                  <>
                    <p>ยินดีต้อนรับ</p>
                    <p><ItemsList/></p>
                    <hr/>
                    <p><Students/></p>
                    <hr/>
                    <p><Subjects/></p>
                    <hr/>
                    <p><ItemFormFind/></p>
                    <hr/>
                    <p><ItemFormFindStu/></p>
                    <hr/>
                    <p><ItemFormFindSub/></p>
                  </>
                ) : (
                  <p>กรุณา Login ก่อนใช้งานทุกครั้งเจ้าค่ะ !! </p>
                )}
              </div>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;