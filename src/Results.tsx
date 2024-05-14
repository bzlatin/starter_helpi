import React, { useState, useEffect } from "react";
import {
  Pane,
  Button,
  Heading,
  TextInputField,
  toaster,
  Text,
  HomeIcon,
  Spinner,
} from "evergreen-ui";
import "./App.css";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

interface ResultsProps {}

const Results: React.FC<ResultsProps> = () => {
  const [careerResult, setCareerResult] = useState<string>("");
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateResult = () => {
      try {
        const resultData = localStorage.getItem("MYRESULTSKEY");
        if (resultData) {
          const careerResultData = JSON.parse(resultData);
          setCareerResult(careerResultData);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error(
          "Failed to parse career results from localStorage:",
          error
        );
        toaster.danger("Error retrieving your career results.");
        setLoading(false);
      }
    };

    window.addEventListener("storageUpdated", updateResult);

    return () => {
      window.removeEventListener("storageUpdated", updateResult);
    };
  }, []);

  let navigate = useNavigate();

  const handleNarrowResults = async (): Promise<void> => {
    setLoading(true);
    toaster.notify("Refreshing results...");

    try {
      const apiKey = JSON.parse(localStorage.getItem("MYKEY") || "null");
      if (!apiKey) {
        toaster.danger("API Key is missing. Please provide a valid API Key.");
        setLoading(false);
        return;
      }

      const savedAnswers = localStorage.getItem("MYANSWERSSKEY");
      if (!savedAnswers) {
        toaster.danger("Original answers are missing. Please retake the quiz.");
        setLoading(false);
        return;
      }

      const originalAnswers = JSON.parse(savedAnswers);

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
                  "You are a bot that tells people what future career to have based on their responses to several questions. Provide a career and a reason for it based on the original answers and the feedback given. Format the response in the following way:\n\nCareer Suggestion: [Career Name]\n\nReasoning:\n[Detailed Reasoning]\n\nEnsure that the formatting is consistent and the response is easy to read.",
              },
              {
                role: "user",
                content: `Original Answers: ${originalAnswers}\nUser Feedback: ${
                  userFeedback ||
                  "No feedback provided. Please suggest another career."
                }`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data.choices && data.choices.length > 0) {
        localStorage.setItem(
          "MYRESULTSKEY",
          JSON.stringify(data.choices[0].message.content)
        );
        window.dispatchEvent(new Event("storageUpdated"));
        setCareerResult(data.choices[0].message.content);
      } else {
        toaster.warning(
          "No career suggestion was generated. Please try again."
        );
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      toaster.danger("Failed to get career suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToHomePage = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        padding="2%"
        background="#F9FAFC"
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
          zIndex={5}
          left={0}
        >
          <Pane position="fixed" top="0px" left="0" minWidth="100%">
            <DropdownMenu />
          </Pane>

          <Button iconBefore={HomeIcon} onClick={goToHomePage}>
            Home
          </Button>
        </Pane>
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="2%"
      background="#F9FAFC"
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
        zIndex={5}
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
        marginTop="5%"
        width="90%"
        maxWidth="600px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
        padding="2%"
      >
        <Heading size={600} marginBottom="20px">
          Your Career Results
        </Heading>
        <Text size={500} marginBottom="20px" style={{ whiteSpace: "pre-wrap" }}>
          {careerResult || "Your result will appear here"}
        </Text>
        <TextInputField
          width="100%"
          placeholder="Enter User Feedback"
          value={userFeedback}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUserFeedback(e.target.value)
          }
          marginBottom="20px"
        />
        <Button onClick={handleNarrowResults} width="100%">
          Refresh My Results
        </Button>
      </Pane>
    </Pane>
  );
};

export default Results;
