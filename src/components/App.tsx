import React from "react";
import "../CSS/App.css";

const App: React.FC = () => {
  return (
    <>
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

// import "../CSS/App.css";

// function App() {
//   return (
//     <>
//       <div className="flex items-center justify-center mb-6">
//         <h1 className="text-3xl font-bold underline">Hello world!!!</h1>
//       </div>
//       <button className="bg-red-300 p-4 hover:bg-red-400 rounded">
//         Project Creation
//       </button>
//     </>
//   );
// }

// export default App;
