import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import { Pane } from "evergreen-ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderButton from "./components/HeaderButton";

function App() {
  const saveKeyData = "MYKEY";
  const [key, setKey] = useState("");

  // Effect to load the saved API key from local storage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem(saveKeyData);
    if (savedKey !== null) {
      setKey(JSON.parse(savedKey));
    }
  }, []);

  // Handle API key change
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // Save API key to local storage
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    // Suggestion: Instead of reloading, consider using a state to indicate the key has been saved or triggering a re-fetch of any data using the new key
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Pane>
                  <HeaderButton />
                </Pane>
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  {/* Rest of your component */}
                </header>
                <Form>
                  <Form.Label>API Key:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Insert API Key Here"
                    value={key}
                    onChange={changeKey}
                  />
                  <Button className="Submit-Button" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
