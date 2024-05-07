import React, { useState, useEffect, useCallback } from "react";
import {
  Pane,
  Button,
  HomeIcon,
  TextInputField,
  Heading,
  Spinner,
  toaster,
  CrossIcon,
  Tooltip,
  RefreshIcon,
} from "evergreen-ui";
import "./App.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

interface Question {
  id: number;
  text: string;
  answer: string;
  loading: boolean;
  hidden: boolean;
  disabled?: boolean;
}

function DetailedQuiz() {
  let navigate = useNavigate(); // Hook for navigation

  const goToResultsPage = () => {
    navigate("/resultsPage");
  };

  const saveResultsData = "MYRESULTSKEY";
  let resultData = "";
  console.log(resultData);

  const prevKey = localStorage.getItem(saveResultsData);
  try {
    if (prevKey !== null) {
      resultData = JSON.parse(prevKey);
    }
  } catch (error) {
    console.error(
      "Failed to parse previous results data from localStorage:",
      error
    );
  }

  const goToHomePage = () => {
    navigate("/home"); // Use the navigate function
  };

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What skills or talents do you have?",
      answer: "",
      loading: false,
      hidden: false,
    },
    {
      id: 2,
      text: "What inspires you to take action?",
      answer: "",
      loading: false,
      hidden: false,
    },
    {
      id: 3,
      text: "What are your favorite aspects of your current job?",
      answer: "",
      loading: false,
      hidden: false,
    },
    {
      id: 4,
      text: "How do you handle stress or pressure?",
      answer: "",
      loading: false,
      hidden: false,
    },
    {
      id: 5,
      text: "What skills do you enjoy practicing or developing?",
      answer: "",
      loading: false,
      hidden: false,
    },
    {
      id: 6,
      text: "What industries fascinate you the most?",
      answer: "",
      loading: false,
      hidden: false,
    },
    {
      id: 7,
      text: "What type of work environment do you prefer?",
      answer: "",
      loading: false,
      hidden: false,
    },
  ]);
  
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);

  const skipQuestion = (id: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: "unsure of" } : q
      )
    );
    setSkippedQuestions((prevSkipped) => [...prevSkipped, id]);
  };

  const comeBackToQuestion = (id: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: "" } : q
      )
    );
    setSkippedQuestions((prevSkipped) =>
      prevSkipped.filter((skippedId) => skippedId !== id)
    );
  };

  const answeredQuestionsCount = questions.filter(
    (q) => q.answer.trim() !== ""
  ).length;
  const progress = (answeredQuestionsCount / questions.length) * 100;

  const handleInputChange = (id: number, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, answer: value } : q))
    );
  };

  const clearAnswer = (id: number) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, answer: "" } : q))
    );
  };

  const checkDone = useCallback(() => {
    //Lets the user know when they are ready to submit
    if (progress === 100) {
      //Progress 100 == All questions answered
      toaster.success(
        "All questions completed. Press 'Get Results' to generate response.",
        {
          duration: 4,
          id: "question-done",
        }
      );
    } else if (progress >= 50 && progress <= 70) {
      toaster.success("Halfway there... you got this!", {
        duration: 2.5,
        id: "question-done",
      });
    }
  }, [progress]); // Include 'progress' in the dependency array for useCallback

  useEffect(() => {
    checkDone(); // Call checkDone whenever questions change
  }, [checkDone, questions]); // Watch for changes in the questions array

  const checkQuestions = () => {
    const allAnswered = questions.every((q) => q.answer.trim() !== "");
    const savedKeyData = "MYKEY";
    const apiKey = JSON.parse(localStorage.getItem(savedKeyData) || "null");

    if (!allAnswered) {
      toaster.warning("Please answer all the questions before proceeding.", {
        duration: 5,
        id: "question-warning",
      });
    } else if (!apiKey) {
      toaster.danger("API Key is missing. Please provide a valid API Key.");
    } else {
      // Clear the previous results data before setting new data
      localStorage.removeItem(saveResultsData);
      callChatGPTAPI(apiKey);
    }
  };

  const callChatGPTAPI = async (apiKey: string) => {
    console.log("Calling API with Key:", apiKey);
    try {
      // Compile the user's answers into a single string
      const userResponses = questions
        .map((q) => `${q.text}: ${q.answer}`)
        .join("\n");

      // Request to OpenAI API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "You are a bot that tells people what future career to have based on their responses to several questions. Give them a career and a reason for it without asking follow-up questions.",
              },
              {
                role: "user",
                content: userResponses,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      // Output or use the suggested career
      if (response.ok && data.choices && data.choices.length > 0) {
        localStorage.setItem(
          saveResultsData,
          JSON.stringify(data.choices[0].message.content)
        );
        window.dispatchEvent(new Event("storageUpdated"));
        goToResultsPage();
      } else {
        toaster.warning(
          "No career suggestion was generated. Please try again."
        );
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      toaster.danger("Failed to get career suggestions. Please try again.");
    }
  };

  const fetchNewQuestion = async (oldQuestionText: string, id: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, loading: true, hidden: true } : q
      )
    );
    try {
      const apiKey = JSON.parse(localStorage.getItem("MYKEY") || "null");
      if (!apiKey) {
        toaster.danger("API Key is missing. Please provide a valid API Key.");
        setQuestions(
          questions.map((q) =>
            q.id === id ? { ...q, loading: false, hidden: false } : q
          )
        );
        return;
      }
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            max_tokens: 60,
            messages: [
              {
                role: "system",
                content: `Provide a different career assessment question, but in a similar format to: "${oldQuestionText}" but not the same. Make sure the new question is different enough, but still is a good question to determine what kind of career the user would want to pursue. Answer in 100 characters or less. Do not put the answer in quotes.`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const newQuestionText = data.choices[0].message.content;
        setQuestions(
          questions.map((q) =>
            q.id === id
              ? { ...q, text: newQuestionText, loading: false, hidden: false }
              : q
          )
        );
      } else {
        toaster.warning("Could not fetch a new question. Please try again.");
        setQuestions(
          questions.map((q) =>
            q.id === id ? { ...q, loading: false, hidden: false } : q
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch new question:", error);
      toaster.danger("Failed to fetch new question. Please try again.");
      setQuestions(
        questions.map((q) =>
          q.id === id ? { ...q, loading: false, hidden: false } : q
        )
      );
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
        zIndex={999}
        left={0}
      >
        <Pane position="fixed" top="0px" left="0" minWidth="100%">
          <DropdownMenu />
        </Pane>

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
            position="relative"
          >
            {question.loading && <Spinner />}
            <Pane position="absolute" top="10%" right="2%">
              <Tooltip content="Refresh Question" position="right">
                <RefreshIcon
                  cursor="pointer"
                  onClick={() => {
                    fetchNewQuestion(question.text, question.id);
                  }}
                ></RefreshIcon>
              </Tooltip>
            </Pane>
            <Pane display="flex" flexDirection="row">
              {!question.hidden && (
                <Heading size={600} marginBottom={10}>
                  {question.text}
                </Heading>
              )}
            </Pane>
            <Pane
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              width="30%"
              >
              <TextInputField
                marginX="5%"
                width="80%"
                placeholder="Your answer..."
                value={question.answer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(question.id, e.target.value)
                }
                disabled={question.answer === "unsure of"}
              />
              {!(skippedQuestions.includes(question.id)) && (
                <>
                  <Tooltip content="Clear answer" position="right">
                    <CrossIcon
                      marginBottom="5%"
                      onClick={() => clearAnswer(question.id)}
                    >
                      Clear Answer
                    </CrossIcon>
                  </Tooltip>
                  <Button
                    appearance="minimal"
                    intent="none"
                    onClick={() => skipQuestion(question.id)}
                    marginRight={8}
                  >
                    Skip
                  </Button>
                </>
              )}
              {skippedQuestions.includes(question.id) && (
                <Button
                  appearance="minimal"
                  intent="none"
                  onClick={() => comeBackToQuestion(question.id)}
                >
                  Unskip
                </Button>
              )}
            </Pane>
          </Pane>
        ))}

        <Button
          appearance="primary"
          marginBottom="10%"
          marginTop="10px"
          onClick={() => {
            checkQuestions();
            goToResultsPage();
          }}
        >
          Get Results
        </Button>
      </Pane>
      <Pane
        backgroundColor="white"
        width="100%"
        position="sticky"
        bottom="4rem"
        padding="10px"
      >
        <LinearProgress variant="determinate" value={progress} />
      </Pane>
    </Pane>
  );
}

export default DetailedQuiz;
