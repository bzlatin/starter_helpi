import React, { useState, useEffect } from "react";
import {
  Pane,
  Button,
  Heading,
  TextInputField,
  toaster,
  Text,
  HomeIcon,
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
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const updateResult = () => {
      try {
        const resultData = localStorage.getItem("MYRESULTSKEY");
        if (resultData) {
          const careerResultData = JSON.parse(resultData);
          setCareerResult(careerResultData);
          setLoading(false); // Set loading to false after data is loaded
        } else {
          setLoading(true); // Ensure loading is true if data is not yet available
        }
      } catch (error) {
        console.error(
          "Failed to parse career results from localStorage:",
          error
        );
        toaster.danger("Error retrieving your career results.");
        setLoading(false); // Also set loading to false here after an error
      }
    };

    window.addEventListener("storageUpdated", updateResult);

    return () => {
      window.removeEventListener("storageUpdated", updateResult);
    };
  }, []);

  let navigate = useNavigate(); // Hook for navigation

  const handleNarrowResults = (): void => {
    setLoading(true); // Set loading to true when starting to narrow results
    toaster.notify("Refreshing results...");
    // Simulate fetching/narrowing results
    setTimeout(() => {
      setLoading(false); // Set loading to false once results are narrowed
    }, 2000);
  };

  const goToHomePage = () => {
    navigate("/home"); // Use the navigate function
  };

  if (loading) {
    return (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        background="#F9FAFC"
      >
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Use the full height of the viewport
      padding="2%" // Use percentage for padding
      background="#F9FAFC"
    >
      <Pane
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={16}
        paddingY={12}
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

        <Button iconBefore={HomeIcon} onClick={goToHomePage}>
          Home
        </Button>
      </Pane>

      <Pane
        marginTop="5%" // Use percentage for margin-top to avoid overlap
        width="90%" // Use percentage for width to scale with screen size
        maxWidth="600px" // Use max-width to limit the size on large screens
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="white"
        borderRadius={3}
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
        padding="2%" // Use percentage for padding
      >
        <Heading size={600} marginBottom="20px">
          Your Career Results
        </Heading>
        <Text size={500} marginBottom="20px">
          {careerResult || "Your result will appear here"}
        </Text>
        <TextInputField
          width="100%"
          placeholder="Enter User Feedback"
          value={userFeedback}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUserFeedback(e.target.value)
          }
          marginBottom="20px"
        />
        <Button onClick={handleNarrowResults} width="100%">
          Refresh My Results
        </Button>
      </Pane>
    </Pane>
  );
};

export default Results;
