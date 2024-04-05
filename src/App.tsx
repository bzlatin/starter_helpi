import React, { useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
// Removed duplicate Button import and corrected the import line
import { TextInput, Pane, Heading, Button } from "evergreen-ui";
import HeaderButton from "./components/HeaderButton"; // Adjust this import path

// local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); // for api key input

  // sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    // Consider using a more React-friendly way to reflect changes
    window.location.reload();
  }

  // whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
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
      {/* Header - Assuming HeaderButton is correctly implemented */}
      <HeaderButton /> {/* This line replaces the previous placeholder for additional content */}

      {/* Main Content */}
      <Pane
        width="100%"
        maxWidth="1024px"
        display="flex"
        justifyContent="space-between"
      >
        {/* Sections omitted for brevity */}

      </Pane>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="auto"
        padding={20}
        background="white"
        borderRadius={3}
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "1024px" }}
      >
        <Form>
          <Form.Label>API Key:</Form.Label>
          <TextInput // Changed from Form.Control to TextInput from Evergreen UI for consistency
            type="password"
            placeholder="Insert API Key Here"
            value={key}
            onChange={changeKey}
          />
          <Button marginTop="10px" onClick={handleSubmit} appearance="primary">
            Submit
          </Button>
        </Form>
      </Pane>
    </Pane>
  );
}

export default App;
