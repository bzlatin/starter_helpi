import React, { useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import { Button, TextInput, Pane, Heading, Button } from "evergreen-ui";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again,
    // I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={16}
      background="tint2"
    >
      {/* Header */}
      <Pane
        width="100%"
        maxWidth="1024px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={20}
        paddingX={16}
        paddingY={12}
        background="white"
        borderRadius={3}
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Logo and title */}
        <Pane flex={1} display="flex" alignItems="center"></Pane>
        <Heading size={600}>Home</Heading>
        <Pane flex={1} display="flex" justifyContent="flex-end">
          {/* Placeholder for additional content */}
        </Pane>
      </Pane>

      {/* Main Content */}
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
          style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)" }}
          marginRight={12}
        >
          <Heading size={500} marginBottom={12}>
            Basic Questions
          </Heading>
          <Button appearance="primary">Go to Basic Questions</Button>
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
          style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)" }}
          marginLeft={12}
        >
          <Heading size={500} marginBottom={12}>
            Detailed Questions
          </Heading>
          <Button appearance="primary">Go to Detailed Questions</Button>
        </Pane>
      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="auto" // Ensures it sticks to the bottom
        padding={20}
        background="white"
        borderRadius={3}
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "1024px",
        }}
      >
        <Form>
          <Form.Label>API Key: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            value={key} // Ensures the input reflects the state
            onChange={changeKey}
          />
          <br />
        </Form>
        <Button marginTop="10px" onClick={handleSubmit}>
          Submit

export default App;
