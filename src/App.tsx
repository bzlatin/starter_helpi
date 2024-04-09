import React, { useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
// Removed duplicate Button import and corrected the import line
import { TextInput, Pane, Heading, Button } from "evergreen-ui";
import HeaderButton from "./components/HeaderButton"; // Adjust this import path
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
