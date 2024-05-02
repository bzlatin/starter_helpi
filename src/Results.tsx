// Results.tsx
import { Button, Pane } from "evergreen-ui";
import React, { useState, ChangeEvent } from "react";
import DropdownMenu from "./DropdownMenu";

interface ResultsProps {
  // Define props here if needed
}

const Results: React.FC<ResultsProps> = () => {
  // State hooks with TypeScript types
  const [careerResult, setCareerResult] = useState<string>("");
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  // Inline CSS styles with TypeScript type
  const styles: { [key: string]: React.CSSProperties } = {
    resultsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2%",
    },
    resultDisplayArea: {
      border: "1px solid #000",
      width: "100%",
      height: "100%",
      marginBottom: "2%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    button: {
      margin: "10px",
      padding: "10px 20px",
      cursor: "pointer",
    },
    input: {
      margin: "10%",
      padding: "10%",
      width: "90%",
    },
    progress: {
      color: "#555",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2%",
    },
  };

  // Event Handlers
  const handleGenerateCareer = (): void => {
    setProgress("Generating...");
    setTimeout(() => {
      setCareerResult("Software Developer");
      setProgress("");
    }, 2000);
  };

  const handleNarrowResults = (): void => {
    setProgress("Narrowing results...");
    setTimeout(() => {
      setCareerResult("Front-end Developer");
      setProgress("");
    }, 2000);
  };

  const handleUserFeedbackChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setUserFeedback(event.target.value);
  };

  const handleSkip = (): void => {
    setProgress("Skipping feedback...");
    setTimeout(() => {
      setUserFeedback("");
      setProgress("");
    }, 1000);
  };

  return (
    <Pane style={styles.container}>
      <Pane style={styles.resultsContainer}>
      <Pane position="fixed" top="0px" left="0" minWidth="100%">
          <DropdownMenu />
        </Pane>
        <h1>Results</h1>
        <Pane style={styles.resultDisplayArea}>
          {careerResult || "Your result will appear here"}
        </Pane>
        <Button
          style={styles.button}
          onClick={handleGenerateCareer}
          disabled={progress !== ""}
        >
          GENERATE CAREER
        </Button>
        <Button
          style={styles.button}
          onClick={handleNarrowResults}
          disabled={progress !== ""}
        >
          Narrow my Results
        </Button>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter User Feedback"
          value={userFeedback}
          onChange={handleUserFeedbackChange}
        />
        <Button
          style={styles.button}
          onClick={handleSkip}
          disabled={progress !== ""}
        >
          SKIP
        </Button>
        <Pane style={styles.progress}>{progress}</Pane>
      </Pane>
    </Pane>
  );
};

export default Results;
