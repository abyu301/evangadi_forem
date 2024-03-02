import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppState } from '../../App';
import classes from './Home.module.css';
import { Link } from'react-router-dom';

import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';

function Home() {
  const { user } = useContext(AppState);
  const [firstName, setFirstName] = useState(' ');
  const searchDom = useRef(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
    }
  }, [user]);

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
              ref={searchDom}
              placeholder="Search Questions"
            />
          </div>
          <div className={classes.username_wrapper}>
            <h2> Welcome: <span>{firstName}</span></h2>
          </div>
        </div>

        <div>
          <h2>Questions</h2>
        </div>
        <div>users and questions</div>
      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
}

export default Home;
