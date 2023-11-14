import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../CSS/App.css";
import CreateProjectPage from "../pages/CreateProjectPage";
import Navigation from "./Navigation";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/project-creation" element={<CreateProjectPage />} />
      <Route
        path="/"
        element={
          <>
            <Navigation />
            <Link to="/project-creation">
              <button className="bg-red-300 p-4 hover:bg-red-400 rounded">
                Create New Project
              </button>
            </Link>
          </>
        }
      />
    </Routes>
  );
};

export default App;
