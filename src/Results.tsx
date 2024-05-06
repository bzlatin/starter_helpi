// Results.tsx
import React, { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import { Pane, Button } from "evergreen-ui";

interface ResultsProps {
  // Define props here if needed
}

const Results: React.FC<ResultsProps> = () => {
  // State hooks with TypeScript types
  const [careerResult, setCareerResult] = useState<string>("");
  // const [userFeedback, setUserFeedback] = useState<string>("");

  const careerResultData = JSON.parse(
    localStorage.getItem("MYRESULTSKEY") || "null"
  );

  useEffect(() => {
    setCareerResult(careerResultData);
  }, [careerResult]);

  // Inline CSS styles with TypeScript type
  const styles: { [key: string]: React.CSSProperties } = {
    resultsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
    },
    resultDisplayArea: {
      border: "1px solid #000",
      width: "80%",
      height: "150px",
      marginBottom: "20px",
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
      margin: "10px",
      padding: "10px",
      width: "80%",
    },
  };

  return (
    <div style={styles.resultsContainer}>
      <Pane position="fixed" top="0px" left="0" minWidth="100%">
        <DropdownMenu />
      </Pane>
      <h1>Your career</h1>
      <div style={styles.resultDisplayArea}>
        {careerResult || "Your result will appear here"}
      </div>

      <Button style={styles.button}>Narrow my Results</Button>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter User Feedback"
        // value={userFeedback}
      />
    </div>
  );
};

export default Results;
