import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import SignInPage from './Components/SignInPage/SignInPage';
import AskQuestions from './Components/AskQuestions/AskQuestions';
import Answer from './Components/Answer/Answer';
import Home from './Components/Home/Home';
import axios from './API/axiosConfig';
import { createContext } from 'react';

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [question, setQuestions] = useState([]);
  const [questionResponseConfig, setQuestionResponseConfig] = useState(null); // Add this state
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
        axios.get('/questions/all-questions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }),
      ]);
  
      setUser(userData.data);
      setQuestions(questionsData.data);
      // Store data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData.data));
      localStorage.setItem('questionsData', JSON.stringify(question));
      setQuestionResponseConfig(questionsData.config); // Store the response config
    } catch (error) {
      console.error(error.response);
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
  }, []); 

  console.log(user, 'user123');
  console.log(question, 'questions123');

  return (
    <AppState.Provider value={{ user, setUser, question, setQuestions, questionResponseConfig }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignUpPage />} />
        <Route path="/register" element={<SignInPage />} />
        <Route path="/ask-questions" element={<AskQuestions />} />
        <Route path="/answers/:questionid" element={<Answer />} />
      </Routes>
    </AppState.Provider>
  
  );
}

export default App;
