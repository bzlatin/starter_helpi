import React, { useState, useEffect } from "react";
import {
  Pane,
  Button,
  Heading,
  TextInputField,
  toaster,
  Text,
  Spinner,
} from "evergreen-ui";
import "./App.css";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

interface ResultsProps {
  // Define props here if needed
}

const Results: React.FC<ResultsProps> = () => {
  const [careerResult, setCareerResult] = useState<string>("");
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to manage loading status

  const careerResultData = JSON.parse(
    localStorage.getItem("MYRESULTSKEY") || "null"
  );

  useEffect(() => {
    if (careerResultData) {
      setCareerResult(careerResultData);
      setIsLoading(false); // Set loading to false when data is loaded
    } else {
      setIsLoading(true); // Keep or set loading to true if data is not yet available
    }
  }, [careerResultData]);

  let navigate = useNavigate();

  const handleNarrowResults = (): void => {
    setIsLoading(true); // Set loading to true when starting to narrow results
    toaster.notify("Narrowing results...");
    // Simulate fetching/narrowing results
    setTimeout(() => {
      setIsLoading(false); // Set loading to false once results are narrowed
    }, 2000);
  };

  const goToHomePage = () => {
    navigate("/home");
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="2%"
      background="#F9FAFC"
    >
      <Pane
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX="2%"
        paddingY="1.5%"
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        position="fixed"
        top={0}
        zIndex={999}
        left={0}
      >
        <Pane position="fixed" top="0px" left="0" minWidth="100%">
          <DropdownMenu />
        </Pane>
        <Button onClick={goToHomePage}>Home</Button>
      </Pane>

      <Pane
        marginTop="5%"
        width="90%"
        maxWidth="600px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
        padding="2%"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Heading size={800} marginBottom="20px">
              Your Career Results
            </Heading>
            <Text size={500} marginBottom="20px">
              {careerResult || "Your result will appear here"}
            </Text>
            <TextInputField
              width="100%"
              placeholder="Enter User Feedback"
              value={userFeedback}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserFeedback(e.target.value)}
              marginBottom="20px"
            />
            <Button onClick={handleNarrowResults} width="100%">
              Narrow My Results
            </Button>
          </>
        )}
      </Pane>
    </Pane>
  );
};

export default Results;
