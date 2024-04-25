import React, { useState } from "react";
import "./App.css";
import { Pane, Button, HomeIcon, Radio, Heading } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
//import DropdownMenu from "./DropdownMenu";

const questions = [
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

const choices = [
  [
    { text: "True", value: "true" },
    { text: "False", value: "false" },
  ],
  [
    { text: "The planning and organization", value: "choice" },
    { text: "The creative process", value: "choice" },
    { text: "The problem solving aspects", value: "choice" },
    { text: "The execution and details", value: "choice" },
  ],
  [
    { text: "True", value: "true" },
    { text: "False", value: "false" },
  ],
  [
    { text: "Analytical and data-driven", value: "choice" },
    { text: "Creative and Expressive", value: "choice" },
    { text: "Technical and Hands-On", value: "choice" },
    { text: "Interpersonal and Service-Oriented", value: "choice" },
  ],
  [
    { text: "True", value: "true" },
    { text: "False", value: "false" },
  ],
  [
    { text: "Outdoors", value: "choice" },
    { text: "In an office", value: "choice" },
    { text: "From home", value: "choice" },
    { text: "In a different places, traveling", value: "choice" },
  ],
  [
    { text: "True", value: "true" },
    { text: "False", value: "false" },
  ],
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
  const [progress, setProgress] = React.useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [selectedChoiceIndices, setSelectedChoiceIndices] = useState<
    Array<number>
  >(new Array(questions.length).fill(null));
  let navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  React.useEffect(() => {
    const answeredQuestions = selectedChoiceIndices.filter(
      (index) => index !== null
    ).length;
    const totalQuestions = questions.length;
    const calculatedProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(calculatedProgress);
  }, [selectedChoiceIndices]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedIndices = [...selectedChoiceIndices];
      updatedIndices[currentQuestionIndex] = index;
      setSelectedChoiceIndices(updatedIndices);

      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] =
        choices[currentQuestionIndex][index].value;
      setAnswers(updatedAnswers);
    };

  const goToHomePage = () => {
    navigate("/home");
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
        <Button iconBefore={HomeIcon} onClick={() => goToHomePage()}></Button>
      </Pane>
      <h1>Basic Question Page</h1>
      <Pane marginBottom={75}>
        <Heading size={600} marginBottom={10}>
          {questions[currentQuestionIndex].text}
        </Heading>
        {choices[currentQuestionIndex].map((choice, index) => (
          <Radio
            key={index}
            label={choice.text}
            value={choice.value}
            checked={selectedChoiceIndices[currentQuestionIndex] === index}
            onChange={handleAnswerChange(index)}
          />
        ))}
      </Pane>
      <Box sx={{ width: "70%" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <Pane display="flex" marginBottom={20}>
        <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          appearance="primary"
          marginLeft={16}
          disabled={currentQuestionIndex === 6}
        >
          Next
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
        <h1>Basic Question Page</h1>
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
            {questions[currentQuestionIndex].text}
          </Heading>
          {choices[currentQuestionIndex].map((choice, index) => (
            <Radio
              key={index}
              label={choice.text}
              value={choice.value}
              checked={selectedChoiceIndices[currentQuestionIndex] === index}
              onChange={handleAnswerChange(index)}
            />
          ))}
        </Pane>
        <Pane display="flex" marginBottom={20}>
          <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            appearance="primary"
            marginLeft={16}
            disabled={currentQuestionIndex === 6}
          >
            Next
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}
export default BasicQuiz;
