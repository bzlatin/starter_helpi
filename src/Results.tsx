// Results.tsx
import React, { useState } from 'react';
import './Results.css'; // Make sure to create a corresponding CSS file for styling
import { Pane, Button } from 'evergreen-ui';

const Results = () => {
  // State hooks
  const [careerResult, setCareerResult] = useState('');
  const [userFeedback, setUserFeedback] = useState('');
  const [progress, setProgress] = useState('');

  // Event Handlers
  const handleGenerateCareer = () => {
    // Implement career generation logic here
    setProgress('Generating...');
    // Simulate career generation
    setTimeout(() => {
      setCareerResult('Software Developer'); // Placeholder result
      setProgress('');
    }, 2000);
  };

  const handleNarrowResults = () => {
    // Implement result narrowing logic here
    setProgress('Narrowing results...');
    // Simulate result narrowing
    setTimeout(() => {
      setCareerResult('Front-end Developer'); // Placeholder narrowed result
      setProgress('');
    }, 2000);
  };

  const handleUserFeedbackChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserFeedback(event.target.value);
  };

  const handleSkip = () => {
    // Implement skip logic here
    setProgress('Skipping feedback...');
    // Simulate skipping feedback
    setTimeout(() => {
      setUserFeedback('');
      setProgress('');
    }, 1000);
  };

  return (
    <Pane className="results-container">
      <h1>You should work in...</h1>
      <Pane className="result-display-area">{careerResult || 'Your result will appear here'}</Pane>
      <Button onClick={handleGenerateCareer} disabled={progress !== ''}>
        GENERATE CAREER
      </Button>
      <Button onClick={handleNarrowResults} disabled={progress !== ''}>
        Narrow my Results
      </Button>
      <input
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
