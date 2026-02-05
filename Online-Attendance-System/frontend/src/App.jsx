import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}

export default App;