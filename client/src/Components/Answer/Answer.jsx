import React, { useContext, useRef, useState, useEffect } from 'react';
import classes from './Answer.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useParams to get the question ID from URL
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from '../../pages/Footer/Footer';
import Header from '../../pages/Header/Header';
import { AppState } from '../../App';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import axios from '../../API/axiosConfig.js';

function Answer() {
    const { questionid } = useParams(); // Get the question ID from URL
    const [question, setQuestion] = useState(null); // State to hold the question details
    const { setQuestions } = useContext(AppState);
    const questionDom = useRef(null);
    const questionDescriptionDom = useRef(null);
    const [editorContent, setEditorContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions(); // Fetch question details when component mounts
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

            {/* Display question details */}
            {question && (
                <div className="card mb-3">
                    <div className="card-header d-flex align-items-center">
                        <div className={classes.publicQuestion_wrapper}>
                            <h5>Question: {question.question}</h5>
                        </div>
                    </div>
                </div>
            )}

            <div className={classes.publicQuestion_wrapper}>
                <h2>Answer The Top Question</h2>
                <Link to={"/"}><p>Go to Question Page</p></Link>
                <form onSubmit={postQuestionSubmit}>
                    <div className={classes.reactQuill_wrapper}>
                        <ReactQuill
                            value={editorContent}
                            onChange={setEditorContent}
                            placeholder="Answer the Question..."
                            type="text"
                            ref={questionDescriptionDom}
                        />
                    </div>
                    <button type='submit' className={classes.publicQuestion_button_wrapper}>Post Your Answer</button>
                </form>
            </div>

            <Footer />
        </section>
    );
}

export default Answer;
