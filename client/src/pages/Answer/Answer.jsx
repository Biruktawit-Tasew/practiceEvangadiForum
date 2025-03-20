import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../Api/axios";
const getAnswer = () => {
  const { question_id } = useParams();
  console.log(question_id);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/answers/${question_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnswer(response.data.answer);
        console.log(answer);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [question_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Answer</h1>
      {answer ? (
        <div>
          <p>{answer.content}</p>
          <p>By: {answer.user_name}</p>
        </div>
      ) : (
        <p>No answer found.</p>
      )}
    </div>
  );
};

export default getAnswer;
