import React, { useState, useEffect } from "react";
import careers from "../data/careers.js";

export default function StudentDashboard() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");

  // Load questions from localStorage (same as admin)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("questions"));
    if (stored && stored.length > 0) setQuestions(stored);
    else {
      setQuestions([
        { id: 1, text: "Do you enjoy problem solving? (Yes/No)" },
        { id: 2, text: "Are you more creative or analytical?" },
        { id: 3, text: "Do you prefer working in teams? (Yes/No)" },
      ]);
    }
  }, []);

  function handleChange(id, value) {
    setAnswers({ ...answers, [id]: value });
  }

  function handleSubmit() {
    const allAnswers = Object.values(answers).join(" ").toLowerCase();

    let career = "Generalist";
    if (allAnswers.includes("creative")) career = "Designer";
    else if (allAnswers.includes("analytical")) career = "Software Engineer";
    else if (allAnswers.includes("team")) career = "Project Manager";

    setResult(career);
    setSubmitted(true);
    localStorage.setItem("studentResult", career);
  }

  return (
    <div className="card">
      <h2>Student Career Assessment</h2>
      {!submitted ? (
        <>
          {questions.map((q) => (
            <div key={q.id} className="question">
              <label>{q.text}</label>
              <input
                type="text"
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder="Type your answer..."
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <div>
          <h3>Your Recommended Career:</h3>
          <p className="highlight">{result}</p>
          <h4>Career Info:</h4>
          <p>{careers[result] || "Explore multiple opportunities!"}</p>
          <button onClick={() => setSubmitted(false)}>Retake Test</button>
        </div>
      )}
    </div>
  );
}
