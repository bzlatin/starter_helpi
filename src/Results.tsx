// Results.tsx
import React, { useState, ChangeEvent } from 'react';

interface ResultsProps {
  // Define props here if needed
}

const Results: React.FC<ResultsProps> = () => {
  // State hooks with TypeScript types
  const [careerResult, setCareerResult] = useState<string>('');
  const [userFeedback, setUserFeedback] = useState<string>('');
  const [progress, setProgress] = useState<string>('');

  // Inline CSS styles with TypeScript type
  const styles: { [key: string]: React.CSSProperties } = {
    resultsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    resultDisplayArea: {
      border: '1px solid #000',
      width: '80%',
      height: '150px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    button: {
      margin: '10px',
      padding: '10px 20px',
      cursor: 'pointer',
    },
    input: {
      margin: '10px',
      padding: '10px',
      width: '80%',
    },
    progress: {
      color: '#555',
    },
  };

  // Event Handlers with TypeScript annotations
  const handleGenerateCareer = (): void => {
    setProgress('Generating...');
    setTimeout(() => {
      setCareerResult('Software Developer');
      setProgress('');
    }, 2000);
  };

  const handleNarrowResults = (): void => {
    setProgress('Narrowing results...');
    setTimeout(() => {
      setCareerResult('Front-end Developer');
      setProgress('');
    }, 2000);
  };

  const handleUserFeedbackChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserFeedback(event.target.value);
  };

  const handleSkip = (): void => {
    setProgress('Skipping feedback...');
    setTimeout(() => {
      setUserFeedback('');
      setProgress('');
    }, 1000);
  };

  return (
    <div style={styles.resultsContainer}>
      <h1>You should work in...</h1>
      <div style={styles.resultDisplayArea}>{careerResult || 'Your result will appear here'}</div>
      <button style={styles.button} onClick={handleGenerateCareer} disabled={progress !== ''}>
        GENERATE CAREER
      </button>
      <button style={styles.button} onClick={handleNarrowResults} disabled={progress !== ''}>
        Narrow my Results
      </button>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter User Feedback"
        value={userFeedback}
        onChange={handleUserFeedbackChange}
      />
      <button style={styles.button} onClick={handleSkip} disabled={progress !== ''}>SKIP</button>
      <div style={styles.progress}>{progress}</div>
    </div>
  );
};

export default Results;
