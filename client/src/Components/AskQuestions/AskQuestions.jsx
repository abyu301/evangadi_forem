import React, { useContext, useRef, useState } from 'react';
import classes from './AskQuestions.module.css';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from '../../pages/Footer/Footer';
import Header from '../../pages/Header/Header';
import { AppState } from '../../App';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import axios from '../../API/axiosConfig.js';

function AskQuestions() {
  const [editorContent, setEditorContent] = useState('');
  const { questions, setQuestions } = useContext(AppState);
  const navigate = useNavigate();
  const questionDom = useRef(null);
  const questionDescriptionDom = useRef(null);

  async function postQuestionSubmit(e) {
    e.preventDefault();
    const questionValue = questionDom.current.value;
    const questionDescriptionValue = questionDescriptionDom.current.value;

    console.log(questionValue)

    if (!questionValue) {
      alert("Please provide your question");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        'questions/add-questions',
        {
          question: questionValue,
          questionDescription: questionDescriptionValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      console.log("Response", response.data);

      const responseData = response.data;

      if (responseData) {
        alert("Question posted successfully.");
        
        setQuestions(prevQuestions => [...prevQuestions, responseData]);
        navigate('/');
      } else {
        console.error("Response data is undefined", response);
        alert("Failed to post question. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post question. Please try again later.");
    }
  }
  
  
  

  return (
    <section>
      <Header />
      <hr className={classes.hr} />
      <div className={classes.question_description}>
        <h2> <span><LightbulbIcon /></span>Steps to write a good question <span><LightbulbIcon /></span></h2>
        <div className={classes.dotted_lines}>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </div>
      </div>
      <div className={classes.publicQuestion_wrapper}>
        <h2>Ask a public question</h2>
        <Link to={"/"}><p>Go to Question Page</p></Link>
        <form onSubmit={postQuestionSubmit}>
          <input type="text" placeholder='Question Title' ref={questionDom} />
          <div className={classes.reactQuill_wrapper}>
            <ReactQuill 
              value={editorContent} 
              // onChange={handleEditorChange} 
              placeholder="Question Description..."
              type="text" 
              ref={questionDescriptionDom}
            />
          </div>
          <button type='submit' className={classes.publicQuestion_button_wrapper}>Post Your Question</button>
        </form>
      </div>
      <Footer />
    </section>
  );
}

export default AskQuestions;
