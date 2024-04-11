import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Home from "./Home";
import BasicQuiz from "./BasicQuiz";
import DetailedQuiz from "./DetailedQuiz";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/basicQuestionPage" element={<BasicQuiz />} />
        <Route path="/detailedQuestionPage" element={<DetailedQuiz />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
