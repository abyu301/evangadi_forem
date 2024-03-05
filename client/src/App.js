import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import SignInPage from './Components/SignInPage/SignInPage';
import AskQuestions from './Components/AskQuestions/AskQuestions';
import Home from './Components/Home/Home';
import axios from './API/axiosConfig';
import { createContext } from 'react';
import './App.css';

export const AppState = createContext();

function App() {
  // Define user, questions, and setQuestions states
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]); // Initialize questions as an empty array

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const [userData, questionsData] = await Promise.all([
        axios.get('/users/check', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }),
        axios.get('/questions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }),
      ]);

      setUser(userData.data);
      setQuestions(questionsData.data);
    } catch (error) {
      console.error(error.response);
      navigate('/login');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(user, 'user123');
  console.log(questions, 'questions123');

  return (
    <AppState.Provider value={{ user, setUser, questions, setQuestions }}>
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
