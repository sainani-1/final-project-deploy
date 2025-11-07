import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./App.css";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <div className="app">
      <header className="header">
        <h1>Career Assessment Tool</h1>
        <nav>
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("student")}>Student</button>
          <button onClick={() => setView("admin")}>Admin</button>
        </nav>
      </header>

      <main>
        {view === "home" && <Home />}
        {view === "student" && <StudentDashboard />}
        {view === "admin" && <AdminDashboard />}
      </main>

      <footer>
        <p>© 2025 Career Assessment Tool | Designed for FEDF-PS30</p>
      </footer>
    </div>
  );
}
