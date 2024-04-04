import React, { useState } from "react";
import logo from "./logo.svg";
import { Pane, Button } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

function HeaderButton() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return <Pane><Button onClick={navigateHome}>Home</Button></Pane>;
}

export default HeaderButton;
