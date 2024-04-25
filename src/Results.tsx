// Results.tsx
import React, { useState, ChangeEvent } from "react";
import {
  Pane,
  Button,
  TextInputField,
  Heading,
  Spinner,
  toaster,
} from "evergreen-ui";


const Results: React.FC = () => {
  const [careerResult, setCareerResult] = useState<string>("");
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [progress, setProgress] = useState<boolean>(false);

  const handleGenerateCareer = (): void => {
    setProgress(true);
    setTimeout(() => {
      setCareerResult("Software Developer");
      setProgress(false);
    }, 2000);
  };

  const handleNarrowResults = (): void => {
    setProgress(true);
    setTimeout(() => {
      setCareerResult("Front-end Developer");
      setProgress(false);
    }, 2000);
  };

  const handleUserFeedbackChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setUserFeedback(event.target.value);
  };

  const handleSkip = (): void => {
    setProgress(true);
    setTimeout(() => {
      setUserFeedback("");
      setProgress(false);
    }, 1000);
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={20}
      background="tint2"
    >
      <Heading size={600} marginBottom={20}>
        You should work in...
      </Heading>
      <Pane
        border="default"
        width="80%"
        height={150}
        marginBottom={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        {progress ? (
          <Spinner />
        ) : (
          careerResult || "Your result will appear here"
        )}
      </Pane>
      <Button
        onClick={handleGenerateCareer}
        disabled={progress}
        marginBottom={12}
      >
        GENERATE CAREER
      </Button>
      <Button
        onClick={handleNarrowResults}
        disabled={progress}
        marginBottom={12}
      >
        Narrow my Results
      </Button>
      <TextInputField
        width="80%"
        placeholder="Enter User Feedback"
        value={userFeedback}
        onChange={handleUserFeedbackChange}
      />
      <Button onClick={handleSkip} disabled={progress} marginBottom={12}>
        SKIP
      </Button>
      {progress && <Spinner />}
    </Pane>
  );
};

export default Results;
