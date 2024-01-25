// Importing the CSS file for styling.
import "./App.css";

// Importing components from specified paths.
import ItemList from "./components/ItemList";
import StudentsList from "./components/StudentsList";
import SubjectsList from "./components/SubjectsList";

// The main function component for the application.
function App() {
  // Returning JSX (JavaScript XML) code.
  return (
    <>
      {/* เปิด div ที่มี className เป็น "block" เพื่อให้สามารถกำหนดสไตล์ได้. */}
      <div className="block">
        {/* เพิ่มหัวข้อด้วย className เป็น "pt-5" เพื่อกำหนด padding-top. */}
        <h1 className="pt-5">My Front-End</h1>

        {/* สร้างการ์ดด้วย className เป็น "card" และ padding-left. */}
        <div className="card pl-20">
          {/* แสดงคอมโพเนนต์ ItemsList. */}
          <ItemList />
        </div>

        {/* สร้างการ์ดอีกอันสำหรับคอมโพเนนต์ Subjects. */}
        <div className="card">
          <SubjectsList />
        </div>

        {/* สร้างการ์ดอีกอันสำหรับคอมโพเนนต์ Students. */}
        <div className="card">
          <StudentsList/>
        </div>
      </div>
    </>
  );
}

// ทำการ export คอมโพเนนต์ App เป็น default export.
export default App;
