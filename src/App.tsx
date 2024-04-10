import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="./home" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;