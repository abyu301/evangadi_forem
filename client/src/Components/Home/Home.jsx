import React, { useContext, useEffect, useState } from 'react';
import { AppState } from '../../App';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';

function Home() {
  const { user, question } = useContext(AppState);
  const [firstName, setFirstName] = useState('');
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
    }
  }, [user]);

  useEffect(() => {
    if (question) {
      setUserQuestions(question);
    }
  }, [question]);

  useEffect(() => {
    console.log("userQuestions:", userQuestions);
  }, [userQuestions]);

  return (
    <section>
      <div>
        <Header />
      </div>
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

        {user && (
          <div>
            <h2>Users</h2>
            <div>Name: {user.firstname}</div>
            <div>Email: {user.email}</div>
          </div>
        )}

{userQuestions.length > 0 && (
  <div>
    <h2>Questions</h2>
    {userQuestions.map((question, index) => (
      <div key={index}>
        <h3>Question: {question.question ? question.question : 'No message'}</h3>
        <p>Description: {question.msg}</p>
      </div>
    ))}
  </div>
)}

      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
}

export default Home;
