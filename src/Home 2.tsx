import React, { useState, useEffect } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import { Pane, Heading, Button, TextInput } from "evergreen-ui";

function Home() {
  const saveKeyData = "MYKEY";
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    const prevKey = localStorage.getItem(saveKeyData);
    if (prevKey !== null) {
      setKey(prevKey);
    }
  }, []);

  function handleSubmit() {
    localStorage.setItem(saveKeyData, key);
    // Here, instead of reloading, you might want to navigate or trigger a state update
  }

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
       {/* This line replaces the previous placeholder for additional content */}

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

export default Home;
