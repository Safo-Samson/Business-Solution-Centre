import React from "react";
import "../CSS/App.css";
import Navigation from "./Navigation";

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold underline">Hello world!!!</h1>
      </div>
      <button className="bg-red-300 p-4 hover:bg-red-400 rounded">
        Project Creation
      </button>
    </>
  );
};

export default App;

