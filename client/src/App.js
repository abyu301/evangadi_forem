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
  const [user, setUser] = useState({});
  const [question, setQuestions] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    const token = localStorage.getItem('token');
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
      // Store data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData.data));
      localStorage.setItem('questionsData', JSON.stringify(questionsData.data));
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  useEffect(() => {
    // Check if data exists in localStorage and fetch if not
    const userData = localStorage.getItem('userData');
    const questionsData = localStorage.getItem('questionsData');
    if (!userData || !questionsData) {
      fetchData();
    } else {
      setUser(JSON.parse(userData));
      setQuestions(JSON.parse(questionsData));
    }
  }, [question]); 

  console.log(user, 'user123');
  console.log(question, 'questions123');

  return (
    <AppState.Provider value={{ user, setUser, question, setQuestions }}>
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
