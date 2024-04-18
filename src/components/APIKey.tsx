import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Pane } from "evergreen-ui";

const ApiKey = () => {
  const saveKeyData = "MYKEY";
  let keyData = "";

  const prevKey = localStorage.getItem(saveKeyData);
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }

  const [key, setKey] = useState(keyData);

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={16}
      width="100%"
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
        marginLeft="10px"
        appearance="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Pane>
  );
};

export default ApiKey;
