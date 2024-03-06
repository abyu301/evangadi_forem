import React, { useContext, useRef, useState, useEffect } from 'react';
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
  const { setQuestions } = useContext(AppState);
  const questionDom = useRef(null);
  const questionDescriptionDom = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await axios.get('/questions/all-questions');
      setQuestions(response.data.questions);
      console.log("Questions:", response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  async function postQuestionSubmit(e) {
    e.preventDefault();
    const questionValue = questionDom.current.value;
    const questionDescriptionValue = questionDescriptionDom.current.value;

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

      console.log(response.config);
      console.log("Response", response);

      const responseData = response.config.data;

      if (responseData) {
        alert("Question posted successfully.");

        // Don't need to refresh here, it will refresh when navigating back to the home page
        // setQuestions(prevQuestions => [...prevQuestions, responseData]);

        navigate('/');
      } else {
        console.error("Response data is undefined", response);
        alert("Failed to post question. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post question.** Please try again later.");
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
              onChange={setEditorContent}
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
