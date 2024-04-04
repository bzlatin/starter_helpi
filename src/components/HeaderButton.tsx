import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Pane, Button } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

function HeaderButton() {
  const navigate = useNavigate();

  const navigateToScreen = () => {
    // Replace '/target-screen' with the path you want to navigate to
    navigate("/target-screen");
  };

  return <button onClick={navigateToScreen}>Home</button>;
}

export default HeaderButton;