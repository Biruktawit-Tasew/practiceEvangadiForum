import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../Api/axios";
import styles from "./answer.module.css";
import { useRef } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
const getAnswer = () => {
  const { question_id } = useParams();
  //   console.log(question_id);
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const description = useRef();
  async function handleSubmit(e) {
    e.preventDefault();

    const descriptionValue = description.current.value;

    if (!descriptionValue) {
      alert("Please provide all required fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `/answers/post-answers/${question_id}`,
        {
          answer: descriptionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Answer posted successfully");
      description.current.value = "";
    } catch (error) {
      console.error("❌ Error posting answer:", error.message);
      alert(`❌ Failed to post answer: ${error.message}`);
    }
  }

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        console.log(question_id);
        const token = localStorage.getItem("token");
        await axios
          .get(`/answers/${question_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setAnswer(response.data.Answers);
            console.log(answer);
          });
        await axios
          .get(`/question/${question_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setQuestion(response.data.question);
          });
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.message ||
            "No Answer Found for the asked Question! Be the First to Answer"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [answer]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.questionSection}>
        <h1 className={styles.questionHeading}>QUESTION</h1>
        <h3 className={styles.questionTitle}>
          <FaCircleArrowRight size={17} color={"#0b5ed7"} /> {question.title}
        </h3>
        <div className={styles.line}></div>
        <h4 className={styles.questionDescription}>{question.content}</h4>
      </div>
      {answer ? (
        <div className={styles.answerSection}>
          <h2 className={styles.answerCommunity}>Answer From The Community</h2>
          {answer?.map((singleAnswer) => (
            <>
              <div key={singleAnswer.answer_id} className={styles.singleAnswer}>
                <div className={styles.avatar}>
                  <IoPersonCircleOutline size={55} />
                  <p> {singleAnswer.user_name}</p>
                </div>
                <p className={styles.answerContent}>{singleAnswer.content}</p>
              </div>
            </>
          ))}
        </div>
      ) : (
        <p>No answer found.</p>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={7}
            placeholder="Question"
            ref={description}
            required
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
};
export default getAnswer;
