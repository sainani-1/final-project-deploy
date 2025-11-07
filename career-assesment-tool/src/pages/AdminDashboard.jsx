import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [adminLogged, setAdminLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState("");

  // Load questions from localStorage on load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("questions")) || [
      { id: 1, text: "Do you enjoy problem solving? (Yes/No)" },
      { id: 2, text: "Are you more creative or analytical?" },
      { id: 3, text: "Do you prefer working in teams? (Yes/No)" },
    ];
    setQuestions(saved);
  }, []);

  // Save updated questions to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleLogin = () => {
    if (password === "admin123") setAdminLogged(true);
    else alert("❌ Wrong password!");
  };

  const addQuestion = () => {
    if (newQ.trim()) {
      const newQuestion = { id: Date.now(), text: newQ };
      setQuestions([...questions, newQuestion]);
      setNewQ("");
      alert("✅ Question added successfully!");
    }
  };

  if (!adminLogged) {
    return (
      <div className="card">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <h3>Manage Assessment Questions</h3>

      <ul>
        {questions.map((q) => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Add new question"
        value={newQ}
        onChange={(e) => setNewQ(e.target.value)}
      />
      <button onClick={addQuestion}>Add</button>
    </div>
  );
}
