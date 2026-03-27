import UserRole from "./Pages/UserRole";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import AdminLoginPage from "./Pages/AdminLoginForm";
import SignupForm from "./Pages/SignupForm";
import AdminDashboard from "./Pages/AdminDashboard";
import { TeacherDashboard } from "./Pages/TeacherDashboard";
import { ClassAttendance } from "./Pages/ClassAttendance";
import StudentDashboard from "./Pages/StudentDashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // TODO: Remove this bypass when backend is ready
  const isDevelopment = true; // Set to false when backend is ready
  
  if (isDevelopment) {
    return children; // Bypass authentication in development
  }
  
  const adminId = localStorage.getItem('adminId');
  return adminId ? children : <Navigate to="/Admin" />;
};

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<UserRole />}></Route>
        <Route path="/Admin" element={<AdminLoginPage />}></Route>
        <Route path="/Admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }></Route>
        <Route path="/Teacher" element={<SignupForm userRole={"Teacher"} Identification={"Employee ID"} Task={"Subject"} />}></Route>
        
        <Route path="/Teacher/dashboard" element={
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        }></Route>
        <Route path="/teacher/class/:classId" element={
          <ProtectedRoute>
            <ClassAttendance />
          </ProtectedRoute>
        }></Route>
        <Route path="/Student" element={<SignupForm userRole={"Student"} Identification={"Student ID"} Task={"Semester"} />}></Route>
        <Route path="/Student/dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }></Route>
      </Routes>
    </>
  );
}

export default App;