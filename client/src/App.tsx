import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [taskListKey, setTaskListKey] = useState(0);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
            <Route 
              path="/tasks" 
              element={
                isAuthenticated ? (
                  <>
                    <header className="header">
                      <Link className="logo" to="/">Task Manager</Link>
                      <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </header>
                    <div className="tasks-container">
                      <TaskForm onTaskCreated={() => setTaskListKey(prev => prev + 1)} />
                      <TaskList key={taskListKey} />
                    </div>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login onLoginSuccess={() => setIsAuthenticated(true)} /> : <Navigate to="/tasks" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/tasks" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
