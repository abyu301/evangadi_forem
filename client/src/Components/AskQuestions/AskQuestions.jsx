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
  const { setUser } = useContext(AppState); // Remove setQuestion from here
  const navigate = useNavigate();
  const titleDom = useRef(null);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  async function postQuestionSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;

    if (!titleValue) {
      alert("Please provide your question");
      return;
    }

    try {
      const response = await axios.post('/add-questions', {
        question: titleValue,
        questiondescription: editorContent,
      });
      const userData = response.data;
      alert("Question posted successfully.");
      setUser(userData); // Assuming your setUser function expects only user data
      navigate('/');
    } catch (error) {
      console.log(error);
      alert("Failed to post question. Please try again later.");
    }
  }

  return (
    <section>
      <div>
        <Header />
      </div>
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
        <input type="text" placeholder='Question Title' ref={titleDom} />
        <form onSubmit={postQuestionSubmit}>
          <div className={classes.reactQuill_wrapper}>
            <ReactQuill 
              value={editorContent} 
              onChange={handleEditorChange} 
              placeholder="Question Description..."
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
