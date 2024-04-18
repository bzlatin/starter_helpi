import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Home from "./Home";
import BasicQuiz from "./BasicQuiz";
import DetailedQuiz from "./DetailedQuiz";
import ApiKey from "./components/APIKey";

function App() {
  return (
    <HashRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/basicQuestionPage" element={<BasicQuiz />} />
          <Route path="/detailedQuestionPage" element={<DetailedQuiz />} />
        </Routes>
        {/* Fixed footer */}
        <div
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            backgroundColor: "#fff", // Add a background color if needed
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)", // Optional: Adds a shadow to the top of the footer
            zIndex: 1000,
          }}
        >
          <ApiKey />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
