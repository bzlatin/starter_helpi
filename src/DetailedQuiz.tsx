import React, { useState } from "react";
import { Pane, Button, HomeIcon, TextInputField, Heading } from "evergreen-ui";
import "./App.css";
import { useNavigate } from "react-router-dom";

function DetailedQuiz() {
  let navigate = useNavigate(); // Hook for navigation

  const goToHomePage = () => {
    navigate("/home"); // Use the navigate function
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="auto" // Adjusted from 100vh to auto for scrolling
      padding={16}
      background="tint2"
    >
      {/* Fixed Header */}
      <Pane
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={16}
        paddingY={12}
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        position="fixed"
        top={0}
        left={0}
        zIndex={1000}
      >
        <Button iconBefore={HomeIcon} onClick={goToHomePage}>
          Home
        </Button>
      </Pane>

      {/* Main Content with Top Margin */}
      <Pane
        marginTop="100px" // Adjust this margin based on the header height
        width="100%"
        maxWidth="1024px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingTop="16px" // Additional padding for aesthetic spacing
        boxSizing="border-box"
      >
        <h1>Detailed Question Page</h1>
        {/* Using similar styled panes for each question as in BasicQuiz */}
        <Pane
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          background="white"
          borderRadius={3}
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
          padding={20}
          marginBottom={20}
        >
          <Heading size={600} marginBottom={10}>
            Question 1?
          </Heading>
          <TextInputField placeholder="Your answer..." />
        </Pane>
        <Pane
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          background="white"
          borderRadius={3}
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
          padding={20}
          marginBottom={20}
        >
          <Heading size={600} marginBottom={10}>
            Question 2?
          </Heading>
          <TextInputField placeholder="Your answer..." />
        </Pane>
        <Pane
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          background="white"
          borderRadius={3}
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
          padding={20}
          marginBottom={20}
        >
          <Heading size={600} marginBottom={10}>
            Question 3?
          </Heading>
          <TextInputField placeholder="Your answer..." />
        </Pane>
        <Button onClick={goToHomePage}>Go Back Home</Button>
      </Pane>
    </Pane>
  );
}

export default DetailedQuiz;
