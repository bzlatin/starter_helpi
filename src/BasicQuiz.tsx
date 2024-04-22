import { useState } from "react";
import "./App.css";
import { Pane, Button, HomeIcon, Radio, Heading } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)

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
const tfChoices = [
  { text: "True", value: "true" },
  { text: "false", value: "false" },
];

function BasicQuiz() {
  let navigate = useNavigate(); // Hook for navigation

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //Setting up for the next Button
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  //Setting up for the back button
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToHomePage = () => {
    navigate("/home"); // Use the navigate function
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
        zIndex={1000}
      >
        <Button iconBefore={HomeIcon} onClick={goToHomePage}>
          Home
        </Button>
      </Pane>
      {/* Additional top margin to prevent content overlap */}
      <Pane
        marginTop="100px" // This should be adjusted to match the height of your header
        width="100%"
        maxWidth="1024px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="white"
      >
        <h1>Basic Question Page</h1>
        <Pane marginBottom={20}>
          <Heading size={600} marginBottom={10}>
            {questions[currentQuestionIndex].text}
          </Heading>
          {tfChoices.map((choice) => (
            <Radio
              key={choice.value}
              label={choice.text}
              value={choice.value}
            />
          ))}
        </Pane>
        <Pane display="flex" marginBottom={20}>
          <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>
            Back
          </Button>
          <Button onClick={handleNext} appearance="primary" marginLeft={16}>
            Next
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}
export default BasicQuiz;
