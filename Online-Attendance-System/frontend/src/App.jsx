import UserRole from "./Pages/UserRole";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import AdminLoginPage from "./Pages/AdminLoginForm";
import SignupForm from "./Pages/SignupForm";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<UserRole />}></Route>
        <Route path="/Admin" element={<AdminLoginPage />}></Route>
        <Route path="/Teacher" element={<SignupForm userRole={"Teacher"} Identification={"Employee ID"} Task={"Subject"} />}></Route>
        <Route path="/Student" element={<SignupForm userRole={"Student"} Identification={"Student ID"} Task={"Semester"} />}></Route>
      </Routes>
    </>
  );
}

export default App;