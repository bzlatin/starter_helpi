import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BasicQuiz from "./BasicQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/basicquestionpage" element={<BasicQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
