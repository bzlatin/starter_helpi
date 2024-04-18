import React, { useState } from "react";
import {
  Pane,
  Button,
  HomeIcon,
  TextInputField,
  Heading,
  toaster,
} from "evergreen-ui";
import "./App.css";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  text: string;
  answer: string;
}

function DetailedQuiz() {
  let navigate = useNavigate(); // Hook for navigation

  const goToHomePage = () => {
    navigate("/home"); // Use the navigate function
  };
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "What skills or talents do you have?", answer: "" },
    { id: 2, text: "What inspires you to take action?", answer: "" },
    {
      id: 3,
      text: "What are your favorite aspects of your current job?",
      answer: "",
    },
    { id: 4, text: "How do you handle stress or pressure?", answer: "" },
    {
      id: 5,
      text: "What skills do you enjoy practicing or developing?",
      answer: "",
    },
    { id: 6, text: "What industries fascinate you the most?", answer: "" },
    { id: 7, text: "What type of work environment do you prefer?", answer: "" },
  ]);

  const handleInputChange = (id: number, value: string) => {
    const newQuestions = questions.map((q) =>
      q.id === id ? { ...q, answer: value } : q
    );
    setQuestions(newQuestions);
  };

  const checkQuestions = () => {
    // Check if all questions have been answered
    const allAnswered = questions.every((q) => q.answer.trim() !== "");
    if (!allAnswered) {
      toaster.warning("Please answer all the questions before proceeding.", {
        duration: 5,
        id: "question-warning", // Optional: add an ID if you want to manipulate or track the toast later
      });
    } else {
      console.log("All questions answered:", questions);
      // Proceed with your API call or further processing here
      console.log("All questions answered, calling API...");

      callChatGPTAPI("replace with key");
    }
  };

  const callChatGPTAPI = async (myAPIKey: string) => {
    console.log("calling api");
    try {
      // Compile the user's answers into a single string
      const userResponses = questions
        .map((q) => `${q.text}: ${q.answer}`)
        .join(" \n");

      // Request to GPT-4 to suggest a career based on the user's answers
      const careerSuggestion = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myAPIKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "You are a bot that tells people what future career to have. You will  be given 7 short answer questions and answers below. Give them the career and one sentence about why they should have that career. Never ask follow up questions. Only give a job title, and explanation.",
              },
              { role: "user", content: userResponses },
            ],
          }),
        }
      ).then((res) => res.json());

      // Output or use the suggested career
      if (careerSuggestion.choices && careerSuggestion.choices.length > 0) {
        console.log(
          "Career suggestion:",
          careerSuggestion.choices[0].message.content
        );
      } else {
        console.log("No career suggestion found.");
        toaster.warning(
          "No career suggestion was generated. Please try again."
        );
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      toaster.danger("Failed to get career suggestions. Please try again.");
    }
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="auto"
      padding={16}
      background="tint2"
    >
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
      >
        <Button iconBefore={HomeIcon} onClick={goToHomePage}>
          Home
        </Button>
      </Pane>

      <Pane
        marginTop="100px"
        width="100%"
        maxWidth="1024px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxSizing="border-box"
      >
        <h1>Detailed Question Page</h1>
        {questions.map((question) => (
          <Pane
            key={question.id}
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
              {question.text}
            </Heading>
            <TextInputField
              placeholder="Your answer..."
              value={question.answer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(question.id, e.target.value)
              }
            />
          </Pane>
        ))}
        <Button
          appearance="primary"
          marginBottom="10%"
          marginTop="10px"
          onClick={() => {
            checkQuestions();
            // function that calls API
            // function to navigate to results page
          }}
        >
          Get Results
        </Button>
      </Pane>
    </Pane>
  );
}

export default DetailedQuiz;
