import React, { useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import { Pane, Button, HomeIcon, Radio, Heading } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
// let basicAnswers = [];
// basicAnswers = ["", "", "", "", "", "", ""];
const tfChoices = [{text: "True", value: "true"}, {text: "false", value: "false"}];
const choices = [
  { text: "Paris", value: "paris" },
  { text: "London", value: "london" },
  { text: "Berlin", value: "berlin" },
  { text: "Rome", value: "rome" },
];
//let basicAnswers = ["", "", "", "", "", "", ""];
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function BasicQuiz() {
  let navigate = useNavigate(); // Hook for navigation

  const [key, setKey] = useState<string>(keyData); //for api key input

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
        <Pane>
          <Heading size = {1200} marginBottom = {20}>
            {"True or False Questions"}
          </Heading>
        </Pane>
        <Heading size={600} marginBottom={10}>
          {"I enjoy working in a team more than working alone."}
        </Heading>
        {tfChoices.map((choice) => (
          <Radio key={choice.value} label={choice.text} value={choice.value} />
        ))}
      </Pane>
      <Pane marginBottom={20}>
        <Heading size={600} marginBottom={10}>
          {"I prefer to follow instructions rather than create my own path."}
        </Heading>
        {tfChoices.map((choice) => (
          <Radio key={choice.value} label={choice.text} value={choice.value} />
        ))}
      </Pane>
      <Pane marginBottom={20}>
        <Heading size={600} marginBottom={10}>
          {"I prefer jobs that offer a clear path for advancement."}
        </Heading>
        {tfChoices.map((choice) => (
          <Radio key={choice.value} label={choice.text} value={choice.value} />
        ))}
      </Pane>
      <Pane marginBottom={20}>
        <Heading size={600} marginBottom={10}>
          {"I prefer to follow instructions rather than create my own path"}
        </Heading>
        {tfChoices.map((choice) => (
          <Radio key={choice.value} label={choice.text} value={choice.value} />
        ))}
      </Pane>
      <Pane marginBottom={20}>
        <Heading size={600} marginBottom={10}>
          {"When working in on a project. I am most interested in:"}
        </Heading>
        {choices.map((choice) => (
          <Radio key={choice.value} label={choice.text} value={choice.value} />
        ))}
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
