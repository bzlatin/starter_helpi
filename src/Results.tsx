import React, { useState } from 'react';
import './Results.css'; // Make sure the CSS file exists and the path is correct
import { Pane, Button, TextInput, Text } from 'evergreen-ui'; // Import necessary components

const Results = () => {
  // State hooks
  const [careerResult, setCareerResult] = useState('');
  const [userFeedback, setUserFeedback] = useState('');
  const [progress, setProgress] = useState('');

  // Event Handlers
  const handleGenerateCareer = () => {
    // TODO: Implement career generation logic here
    setProgress('Generating...');
    setTimeout(() => {
      setCareerResult('Software Developer'); // Placeholder result
      setProgress('');
    }, 2000);
  };

  const handleNarrowResults = () => {
    // TODO: Implement result narrowing logic here
    setProgress('Narrowing results...');
    setTimeout(() => {
      setCareerResult('Front-end Developer'); // Placeholder narrowed result
      setProgress('');
    }, 2000);
  };

  const handleUserFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserFeedback(event.target.value);
  };

  const handleSkip = () => {
    // TODO: Implement skip logic here
    setProgress('Skipping feedback...');
    setTimeout(() => {
      setUserFeedback('');
      setProgress('');
    }, 1000);
  };

  return (
    <Pane className="results-container">
      <Text>You should work in...</Text>
      <Pane className="result-display-area">{careerResult || 'Your result will appear here'}</Pane>
      <Button onClick={handleGenerateCareer} disabled={progress !== ''}>
        GENERATE CAREER
      </Button>
      <Button onClick={handleNarrowResults} disabled={progress !== ''}>
        Narrow my Results
      </Button>
      <TextInput
        type="text"
        placeholder="Enter User Feedback"
        value={userFeedback}
        onChange={handleUserFeedbackChange}
      />
      <Button onClick={handleSkip} disabled={progress !== ''}>SKIP</Button>
      <Pane className="progress">{progress}</Pane>
    </Pane>
  );
};

export default Results;
