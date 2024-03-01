import React, { useState } from 'react';
import classes from './AskQuestions.module.css';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from '../../pages/Footer/Footer';
import Header from '../../pages/Header/Header';

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../Components/SignUpPage/img/logo.png';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

function AskQuestions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

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
        <p>Go to Question Page</p>
        <input type="text" 
                placeholder='Question Title'
        />

        <div className={classes.reactQuill_wrapper}>
            <ReactQuill 
              value={editorContent} 
              onChange={handleEditorChange} 
              placeholder="Question Description..."
              
            />
        </div>
          <Link to="/">
          <button className={classes.publicQuestion_button_wrapper}>Post Your Question</button>
          </Link>
      </div>
      <Footer />
    </section>
  );
}

export default AskQuestions;
