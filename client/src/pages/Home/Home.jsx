import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import styles from "./home.module.css"; // Import modular CSS
import axios from "../../Api/axios";
import { AppState } from "../../App";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AppState);
  console.log(user);
  useEffect(() => {
    // local storage

    const token = localStorage.getItem("token");

    // Use axios to fetch data
    axios
      .get("/question/all-questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Axios wraps the response in a data object
        setQuestions(response.data.questions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error.message);
        setError("Failed to connect to the server. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* Welcome User (Top Right) */}
      <div className={styles.welcomeUser}>
        <h5>
          <>Welcome:</><IoMdPerson className={styles.avatar} size={38}/>
          <strong>{user.username}</strong>
        </h5>
      </div>

      {/* Ask Question Button */}
      <div className={styles.askQuestionContainer}>
        <Link to="/question" className={styles.askQuestionButton}>
          Ask Question
        </Link>

        <br />
        <input
          type="text"
          placeholder="Search questions"
          className={styles.searchInput}
        />
      </div>

      <h4 className={styles.questionsHeading}>Questions</h4>

      <div className={styles.listGroup}>
        {loading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : questions.length > 0 ? (
          questions.map((q) => (
            <Link
              to={`/answer/${q.question_id}`} // Use question_id for navigation
              key={q.question_id}
              className={styles.listItem}
            >
              {/* Profile Image & Username */}
              <div className={styles.profileSection}>
                <IoPersonCircleOutline size={80} />
                <div className={styles.username}>{q.username}</div>
              </div>

              {/* Question Text */}
              <div className={styles.questionText}>
                <p className={styles.questionTitle}>{q.title}</p>
                <p className={styles.questionDescription}>{q.description}</p>
              </div>

              {/* More (Arrow Icon) */}
              <IoIosArrowForward size={37} className={styles.arrowIcon} />
            </Link>
          ))
        ) : (
          <p className={styles.noQuestionsText}>No questions yet...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
