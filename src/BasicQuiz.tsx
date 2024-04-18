import React, { useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import { Pane, Button, HomeIcon, Radio, Heading } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)


const questions = [
  {text: "1. I enjoy working in a team more than working alone.", value: "Q1"},
  {text: "2. When working on a project. I am most interested in: ", value: "Q2"},
  {text: "3. I am passionate about helping others directly.", value: "Q3"},
  {text: "4. I am drawn to tasks that are: ", value: "Q4"},
  {text: "5. I prefer to follow instructions rather than create my own path.", value: "Q5"},
  {text: "6. I am more interested in working: ", value: "Q6"},
  {text: "7. I prefer jobs that offer a clear path for advancement.", value: "Q7"}
];

//Scuffed way to do choices
const choices1 = [{text: "True", value: "true"}, {text: "False", value: "false"}];
const choices2 = [{text: "The planning and organization", value: "choice"}, {text: "The creative process", value: "choice"}, {text: "The problem solving aspects", value: "choice"}, {text: "The execution and details", value: "choice"}];
const choices3 = [{text: "True", value: "true"}, {text: "False", value: "false"}]
const choices4 = [{text: "Analytical and data-driven", value: "choice"}, {text: "Creative and Expressive", value: "choice"}, {text: "Technical and Hands-On", value: "choice"}, {text: "Interpersonal and Service-Oriented", value: "choice"}];
const choices5 = [{text: "True", value: "true"}, {text: "False", value: "false"}];
const choices6 = [{text: "Outdoors", value: "choice"}, {text: "In an office", value: "choice"}, {text: "From home", value: "choice"}, {text: "In a different places, traveling", value: "choice"}];
const choices7 = [{text: "True", value: "true"}, {text: "False", value: "false"}];

const choices = [choices1, choices2, choices3, choices4, choices5, choices6, choices7];

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function BasicQuiz() {
  let navigate = useNavigate(); // Hook for navigation

  const [key, setKey] = useState<string>(keyData); //for api key input
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //Setting up for the next Button
  const handleNext = () => {
    if(currentQuestionIndex < questions.length-1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
  //Setting up for the back button
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex-1);
    }
  };

  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
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
        maxWidth="1024px"
        display="flex"
        alignItems="center"
        justifyContent="right"
        marginBottom={20}
        paddingX={16}
        paddingY={12}
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px (0, 0, 0, 0.1)"
      >
        <Button iconBefore={HomeIcon} onClick={() => goToHomePage()}></Button>
      </Pane>
      <h1>Basic Question Page</h1>
      <Pane marginBottom={20}>
        <Heading size={600} marginBottom={10}>
          {questions[currentQuestionIndex].text}
        </Heading>
        {choices[currentQuestionIndex].map((choice, index) => (
    <Radio key={index} label={choice.text} value={choice.value} />
  ))}
      </Pane>
      <Pane display="flex" marginBottom={20}>
        <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</Button>
        <Button onClick={handleNext} appearance="primary" marginLeft={16} disabled={currentQuestionIndex === 6}>Next</Button>
      </Pane>
      <Button onClick={() => goToHomePage()}>Go Back Home</Button>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="auto"
        padding={20}
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        width="100%"
        maxWidth="1024px"
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>API Key:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insert API Key Here"
              value={key}
              onChange={changeKey}
            />
          </Form.Group>
        </Form>
        <Button
          alignContent="center"
          marginTop={16}
          appearance="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Pane>
    </Pane>
  );
}
export default BasicQuiz;
