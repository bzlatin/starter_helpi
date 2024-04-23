import { useState } from "react";
import "./App.css";
import { Pane, Button, HomeIcon, Radio, Heading } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
//Hopefully it works


const questions = [

  { text: "1. I enjoy working in a team more than working alone.", value: "Q1" },
  { text: "2. When working on a project. I am most interested in: ", value: "Q2" },
  { text: "3. I am passionate about helping others directly.", value: "Q3" },
  { text: "4. I am drawn to tasks that are: ", value: "Q4" },
  { text: "5. I prefer to follow instructions rather than create my own path.", value: "Q5" },
  { text: "6. I am more interested in working: ", value: "Q6" },
  { text: "7. I prefer jobs that offer a clear path for advancement.", value: "Q7" }
];

const choices = [
  [{ text: "True", value: "true" }, { text: "False", value: "false" }],
  [
    { text: "The planning and organization", value: "choice" },
    { text: "The creative process", value: "choice" },
    { text: "The problem solving aspects", value: "choice" },
    { text: "The execution and details", value: "choice" }
  ],
  [{ text: "True", value: "true" }, { text: "False", value: "false" }],
  [
    { text: "Analytical and data-driven", value: "choice" },
    { text: "Creative and Expressive", value: "choice" },
    { text: "Technical and Hands-On", value: "choice" },
    { text: "Interpersonal and Service-Oriented", value: "choice" }
  ],
  [{ text: "True", value: "true" }, { text: "False", value: "false" }],
  [
    { text: "Outdoors", value: "choice" },
    { text: "In an office", value: "choice" },
    { text: "From home", value: "choice" },
    { text: "In a different places, traveling", value: "choice" }
  ],
  [{ text: "True", value: "true" }, { text: "False", value: "false" }]
];

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function BasicQuiz() {
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [selectedChoiceIndices, setSelectedChoiceIndices] = useState<Array<number>>(new Array(questions.length).fill(null));
  let navigate = useNavigate();

  const [key, setKey] = useState<string>(keyData);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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


  const handleAnswerChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIndices = [...selectedChoiceIndices];
    updatedIndices[currentQuestionIndex] = index;
    setSelectedChoiceIndices(updatedIndices);

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = choices[currentQuestionIndex][index].value;
    setAnswers(updatedAnswers);
  }

  const handleSubmit = () => {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


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
        zIndex={1000}
      >
        <Button iconBefore={HomeIcon} onClick={() => goToHomePage()}></Button>
      </Pane>
      <h1>Basic Question Page</h1>
      <Pane marginBottom={20}>
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
        <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</Button>
        <Button onClick={handleNext} appearance="primary" marginLeft={16} disabled={currentQuestionIndex === 6}>Next</Button>
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
