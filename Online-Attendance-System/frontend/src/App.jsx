import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import AdminLoginPage from "./Pages/AdminLoginForm";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/Admin" element={<AdminLoginPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;