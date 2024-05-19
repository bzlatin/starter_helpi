import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Pane, Button, HomeIcon, Radio, Heading, toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import DropdownMenu from "./DropdownMenu";

interface Question {
  text: string;
  value: string;
}

interface Answer {
  id: number;
  text: string;
  answer: string;
}

const questions: Question[] = [
  {
    text: "1. I enjoy working in a team more than working alone.",
    value: "Q1",
  },
  {
    text: "2. When working on a project. I am most interested in: ",
    value: "Q2",
  },
  { text: "3. I am passionate about helping others directly.", value: "Q3" },
  { text: "4. I am drawn to tasks that are: ", value: "Q4" },
  {
    text: "5. I prefer to follow instructions rather than create my own path.",
    value: "Q5",
  },
  { text: "6. I am more interested in working: ", value: "Q6" },
  {
    text: "7. I prefer jobs that offer a clear path for advancement.",
    value: "Q7",
  },
];

const choices: string[][] = [
  ["True", "False"],
  [
    "The planning and organization",
    "The creative process",
    "The problem-solving aspects",
    "The execution and details",
  ],
  ["True", "False"],
  [
    "Analytical and data-driven",
    "Creative and Expressive",
    "Technical and Hands-On",
    "Interpersonal and Service-Oriented",
  ],
  ["True", "False"],
  ["Outdoors", "In an office", "From home", "In different places, traveling"],
  ["True", "False"],
];

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function BasicQuiz() {
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState(() =>
    questions.map((q, index) => ({ id: index + 1, text: q.text, answer: "" }))
  );

  const [skipPressed, setSkipPressed] = useState(false);
  let navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const answeredQuestions = answers.filter((ans) => ans.answer !== "").length;
    const totalQuestions = questions.length;
    const calculatedProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(calculatedProgress);
  }, [answers]);

  const handleNext = () => {
    if (!answers[currentQuestionIndex].answer) {
      toaster.warning("You must answer the question before proceeding.", {
        duration: 5,
        id: "next",
      });
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSkipPressed(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setAnswers((prevAnswers) => {
        const newAnswers = prevAnswers.map((answer, idx) => {
          if (idx === currentQuestionIndex - 1) {
            return { ...answer, answer: "" };
          }
          return answer;
        });
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        return newAnswers;
      });
    }
  };

  const handleAnswerChange =
    (index: number): React.ChangeEventHandler<HTMLInputElement> =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswers: Answer[] = answers.map((answer, idx) => {
        if (idx === currentQuestionIndex) {
          return { ...answer, answer: choices[currentQuestionIndex][index] };
        }
        return answer;
      });
      setAnswers(newAnswers);
      setSkipPressed(false);
    };

  const goToHomePage = () => {
    navigate("/home");
  };
  const goToResultsPage = () => {
    navigate("/resultsPage");
  };

  const saveResultsData = "MYRESULTSKEY";
  const saveAnswersData = "MYANSWERSSKEY";
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

  const handleClearAnswer = () => {
    const newAnswers = answers.map((answer, idx) => {
      if (idx === currentQuestionIndex) {
        return { ...answer, answer: "" };
      }
      return answer;
    });
    setAnswers(newAnswers);
  };

  const checkDone = useCallback(() => {
    if (progress === 100) {
      toaster.success(
        "All questions completed. Press 'Get Results' to generate response.",
        { duration: 4, id: "question-done" }
      );
    } else if (progress >= 50 && progress <= 70) {
      toaster.success("Halfway there... you got this!", {
        duration: 2.5,
        id: "question-done",
      });
    }
  }, [progress]);

  useEffect(() => {
    checkDone();
  }, [checkDone]);

  const checkQuestions = (updatedAnswers: Answer[] = answers) => {
    const allAnswered = updatedAnswers.every((q) => q.answer.trim() !== "");
    console.log(answers, "??");
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
      localStorage.removeItem(saveResultsData);
      callChatGPTAPI(apiKey);
      goToResultsPage();
    }
  };

  const handleSkip = () => {
    setAnswers((prevAnswers) => {
      const newAnswers = prevAnswers.map((answer, idx) => {
        if (idx === currentQuestionIndex) {
          return { ...answer, answer: "N/A" };
        }
        return answer;
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        checkQuestions(newAnswers);
      }

      return newAnswers;
    });

    setAnswers(newAnswers);
    setSkipPressed(true)
  };

  const callChatGPTAPI = async (apiKey: string) => {
    console.log("Calling API with Key:", apiKey);
    try {
      const userResponses = answers
        .map((q) => `${q.text}: ${q.answer}`)
        .join("\n");
      localStorage.setItem(saveAnswersData, JSON.stringify(userResponses));

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
                  "You are a bot that tells people what future career to have based on their responses to several questions. Give them a career and a reason for it without asking follow-up questions. Format the response in the following way:\n\nCareer Suggestion: [Career Name]\n\nReasoning:\n[Detailed Reasoning]\n\nEnsure that the formatting is consistent and the response is easy to read.",
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

      if (data.choices && data.choices.length > 0) {
        console.log("Career suggestion:", data.choices[0].message.content);
        localStorage.setItem(
          saveResultsData,
          JSON.stringify(data.choices[0].message.content)
        );
        window.dispatchEvent(new Event("storageUpdated"));
      } else {
        console.log("No career suggestion found.");
        toaster.warning(
          "No career suggestion was generated. Please try again & ensure you selected the correct API Key."
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
        <Heading
          marginTop={20}
          marginBottom={40}
          fontSize={"2rem"}
          fontWeight={600}
          color={"coral"}
          textShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          Basic Quiz
        </Heading>
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
          position="relative"
        >
          <Heading size={600} marginBottom={10}>
            {questions[currentQuestionIndex]?.text}
          </Heading>
          {choices[currentQuestionIndex]?.map((choice, index) => (
            <Radio
              key={index}
              label={choice}
              value={choice}
              checked={answers[currentQuestionIndex]?.answer === choice}
              onChange={handleAnswerChange(index)}
            />
          ))}
          <Button size="medium" marginTop="15px" onClick={handleClearAnswer}>
            Clear Answer
          </Button>
        </Pane>
        <Box sx={{ width: "70%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
        <Pane display="flex" marginBottom={20}>
          <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>
            Back
          </Button>
          <Button size="medium" marginLeft={16} onClick={handleSkip} disabled={skipPressed}>
            Skip
          </Button>
          <Button
            onClick={handleNext}
            appearance="primary"
            marginLeft={16}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
        </Pane>
        <Button
          appearance="primary"
          marginBottom="10%"
          marginTop="10px"
          onClick={() => checkQuestions()}
        >
          Get Results
        </Button>
      </Pane>
    </Pane>
  );
}

export default BasicQuiz;
