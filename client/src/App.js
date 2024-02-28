import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import SignInPage from "./Components/SignInPage/SignInPage";
import Register from "./pages/Register/Register";
import axios from "./API/axiosConfig";
import { createContext, useEffect, useState } from "react";
import "./App.css";

export const AppState = createContext();
function App() {
  const [user, setuser] = useState({});
  // console.log(user)

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
        {/* <Route path="/signin" element={<SignInPage />} /> */}
        <Route path="/login" element={<SignUpPage />} />
        <Route path="/register" element={<SignInPage />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
