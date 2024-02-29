import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import SignInPage from "./Components/SignInPage/SignInPage";
import AskQuestions from "./Components/AskQuestions/AskQuestions";
import Home from "./Components/Home/Home";
import axios from "./API/axiosConfig";
import { createContext, useEffect, useState } from "react";
import "./App.css";

export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const response = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const userData = response.data; 
      setUser(userData); 
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  console.log(user, "user123");

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignUpPage />} />
        <Route path="/register" element={<SignInPage />} />
        <Route path="/ask-questions" element={<AskQuestions />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
