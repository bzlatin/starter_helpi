import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Pane, Heading, Button } from "evergreen-ui";
import "App.tsx";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function DetailedQuiz() {
  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);

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
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <Heading size={600}>Detailed Quiz</Heading>
        </Pane>
        <div>
          <p>hello world</p>
        </div>

        {/* API Key Input Section */}
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
}

export default DetailedQuiz;
