import React, { useState, useEffect } from 'react';
import classes from './Answer.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from '../../pages/Footer/Footer';
import Header from '../../pages/Header/Header';
import axios from '../../API/axiosConfig.js';
import defaultUserImage from '../assets/user.png';

function Answer() {
    const { questionid } = useParams(); 
    const [question, setQuestion] = useState(null); 
    const navigate = useNavigate();
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        fetchQuestion(); 
    }, []);

    async function fetchQuestion() {
        try {
            const response = await axios.get(`/questions/${questionid}`);
            setQuestion(response.data); // Set the specific question in state
        } catch (error) {
            console.error("Error fetching question details:", error);
            // Handle error: Display an error message to the user
        }
    }

    async function postAnswerSubmit(e) {
        e.preventDefault();

        if (!editorContent) {
            alert("Please provide your answer");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `/answers/${questionid}/answers`, 
                {
                    questionId: questionid,
                    answer: editorContent
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            console.log("Response", response);

            if (response.status === 201) {
                alert("Answer posted successfully.");
                navigate(`/answers/${question.questionid}`);
                setEditorContent('');
            } else {
                console.error("Failed to post answer", response);
                alert("Failed to post answer. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to post answer. Please try again later.");
        }
    }

    return (
      <section>
          <Header />
          <hr className={classes.hr} />
          <div className={classes.home_body_wrapper}>
              {question && (
                  <div key={question.questionid} className="card mb-3">
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
                          {/* <div>Question: {question.question ? question.question : 'No message'}</div> */}
                          <h3> <span>Question ?</span> {question.question}</h3>
                      </div>
                  </div>
              
                  <div className={classes.publicQuestion_wrapper}>
                      <h2>Answer The Question</h2>
                      <Link to={`/question/${questionid}`}><p>Go back to Question Page</p></Link>
                      <form onSubmit={postAnswerSubmit}>
                          <div className={classes.reactQuill_wrapper}>
                              <ReactQuill
                                  value={editorContent}
                                  onChange={setEditorContent}
                                  placeholder="Answer the Question..."
                              />
                          </div>
                          <button type='submit' className={classes.publicQuestion_button_wrapper}>Post Your Answer</button>
                      </form>
                  </div>
              </div>
              
              )}
          </div>
          <Footer />
      </section>
  );
}  
export default Answer;
