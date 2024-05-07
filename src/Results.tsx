// Results.tsx
import React, { useState, useEffect } from "react";
import { Pane, Button, Text, TextInputField, toaster } from "evergreen-ui";
import DropdownMenu from "./DropdownMenu";

interface ResultsProps {
  // Define props here if needed
}

const Results: React.FC<ResultsProps> = () => {
  const [careerResult, setCareerResult] = useState<string>("");
  const [userFeedback, setUserFeedback] = useState<string>("");

  useEffect(() => {
    const careerResultData = JSON.parse(localStorage.getItem("MYRESULTSKEY") || "null");
    setCareerResult(careerResultData);
  }, []);

  const handleNarrowResults = (): void => {
    // Add functionality or toast here
    toaster.notify('Narrowing results...');
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={16}
      background="tint2"
      width="100%"
    >
      <Pane
        position="fixed"
        top={0}
        left={0}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={16}
        paddingY={12}
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      >
        <Pane position="fixed" top="0px" left="0" minWidth="100%">
          <DropdownMenu />
        </Pane>
      </Pane>

      <Pane
        marginTop="100px"
        width="100%"
        maxWidth="600px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
        padding={20}
      >
        <Text size={600} marginBottom={20}>Your Career</Text>
        <Pane
          width="100%"
          minHeight="150px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          border="1px solid #000"
          marginBottom={20}
        >
          {careerResult || 'Your result will appear here'}
        </Pane>

        <Button onClick={handleNarrowResults} width="100%" marginBottom={20}>
          Narrow My Results
        </Button>
        
        <TextInputField
          width="100%"
          placeholder="Enter User Feedback"
          value={userFeedback}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserFeedback(e.target.value)}
        />
      </Pane>
    </Pane>
  );
};

export default Results;
