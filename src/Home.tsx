// import React, { useState } from "react";
import "./App.css";
import { Pane, Heading, Button } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

function Home() {
  let navigate = useNavigate(); // Hook for navigation

  const goToBasicQuestionPage = () => {
    navigate("/basicQuestionPage"); // Use the navigate function
  };
  const goToDetailedQuestionPage = () => {
    navigate("/detailedQuestionPage"); // Use the navigate function
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="auto"
      padding={16}
      background="#F9FAFC"
    >
      {/* Header */}
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
        zIndex={999}
        left={0}
      >
        <Pane position="fixed" top="0px" left="0" minWidth="100%">
          <DropdownMenu />
        </Pane>
        <Heading size={600}>Home</Heading>
      </Pane>

      {/* Main Content with Padding to Avoid Overlapping the Header */}
      <Pane
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingTop="70px" // Adjust this padding to ensure it's enough to clear the fixed header
        boxSizing="border-box"
        background="#F9FAFC
"
      >
        <Pane
          width="100%"
          maxWidth="1024px"
          display="flex"
          justifyContent="space-between"
        >
          {/* Basic Questions Section */}
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={20}
            background="white"
            borderRadius={3}
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
            marginRight={12}
          >
            <Heading size={500} marginBottom={12}>
              Basic Questions
            </Heading>
            <Button appearance="primary" onClick={goToBasicQuestionPage}>
              Go to Basic Questions
            </Button>
            <Pane maxWidth="75%" fontSize="12px" marginTop={12}>
              <p>
                Explore answers to basic career questions: Dive into our
                foundational guide for straightforward insights and answers to
                your fundamental career queries. Perfect for those seeking
                clear, concise information before delving deeper.
              </p>
            </Pane>
          </Pane>

          {/* Detailed Questions Section */}
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={20}
            background="white"
            borderRadius={3}
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
            marginLeft={12}
          >
            <Heading size={500} marginBottom={12}>
              Detailed Questions
            </Heading>
            <Button appearance="primary" onClick={goToDetailedQuestionPage}>
              Go to Detailed Questions
            </Button>
            <Pane maxWidth="75%" fontSize="12px" marginTop={12}>
              <p>
                Delve deeper with answers to detailed career questions: Our
                comprehensive guide offers in-depth insights and answers, ideal
                for those who have already explored basic concepts and seek
                further clarification.
              </p>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Home;
