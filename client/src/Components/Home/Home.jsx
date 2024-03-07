import React, { useContext, useEffect, useState } from 'react';
import { AppState } from '../../App';
import { Link } from 'react-router-dom';
import classes from './Home.module.css';
import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';
import defaultUserImage from '../assets/user.png';
import axios from '../../API/axiosConfig';
import { FaChevronRight } from 'react-icons/fa';

function Home() {
  const { user } = useContext(AppState);
  const [firstName, setFirstName] = useState('');
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
    }
  }, [user]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await axios.get('/questions/all-questions');
      setUserQuestions(response.data.questions);
      console.log("Questions:", response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  return (
    <section>
      <Header />
      <hr className={classes.hr} />
  
      <div className={classes.home_body_wrapper}>
        <div className={classes.top_body_wrapper}>
          <div className={classes.ask_questions}>
            <button><Link to={"/ask-questions"}>Ask Questions</Link></button>
          </div>
  
          <div className={classes.search_input}>
            <input
              type="search"
              placeholder="Search Questions"
            />
          </div>
          <div className={classes.username_wrapper}>
            <h2> Welcome: <span>{firstName}</span></h2>
          </div>
        </div>
  
        {userQuestions.map((question, index) => (
          <div key={index} className="card mb-3">
            <div className={`card-header d-flex align-items-center ${classes.questionData_wrapper}`}>
              <div className="avatar me-2">
                <img
                  src={question.userPhoto || defaultUserImage}
                  alt="User Avatar"
                  className="rounded-circle"
                  width="90"
                  height="90"
                />
              </div>
              <div>User ID: {question.usersid ? question.usersid : 'Unknown'}</div>
              <div className={classes.singleQuestion_wrapper}>
                <Link to={`/answers/${question.questionid}`}>
                  <h3>
                    <span>Question ?</span>
                    <br />
                    {question.question}
                  </h3>
                  <h5 className="card-title">
                    <FaChevronRight className={classes.opposite} />
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      <Footer />
    </section>
  );
  
  
}

export default Home;