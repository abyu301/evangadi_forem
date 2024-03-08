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
  const [questionResponseConfig, setQuestionResponseConfig] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token does not exist, navigate to the login page
      navigate('/login');
    } else {
      fetchData();
    }
  }, []); 

  async function fetchData() {
    try {
      const [userData, questionsData] = await Promise.all([
        axios.get('/users/check', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }),
        axios.get('/questions/all-questions', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }),
      ]);
  
      setUser(userData.data);
      setQuestions(questionsData.data);
     
      localStorage.setItem('userData', JSON.stringify(userData.data));
      localStorage.setItem('questionsData', JSON.stringify(question));
      setQuestionResponseConfig(questionsData.config); 
    } catch (error) {
      console.error(error.response);
    }
  }

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
