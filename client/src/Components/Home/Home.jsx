import React, { useContext, useEffect, useState } from 'react';
import { AppState } from '../../App';
import { Link } from 'react-router-dom';
import classes from './Home.module.css';
import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import defaultUserImage  from '../assets/user.png';


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
    console.log("Question response config:"); 
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

        {userQuestions.questions && userQuestions.questions.some(question => !!question) && (
          <div>
            <h2>Questions</h2>
            {userQuestions.questions.map((question, index) => (
              <div key={index} className="card mb-3">
                <div className="card-header d-flex align-items-center">
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
                </div>
                <div className="card-body">
                  <h5 className="card-title">Question: {question.question ? question.question : 'No message'}</h5>
                  <p className="card-text">Description: {question.questiondescription ? question.questiondescription : 'No description'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
}

export default Home;
