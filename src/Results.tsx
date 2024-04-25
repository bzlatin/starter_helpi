// Results.tsx
import React, { useEffect, useState } from "react";
import {
  Pane,
  Button,
  TextInputField,
  Heading,
  Spinner,
  toaster,
} from "evergreen-ui";

interface ResultsProps {
  userData: any; // Prop to receive user data and responses
}

const Results: React.FC = ( userData ) => {
  const [careerResult, setCareerResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userData) {
      fetchCareerRecommendation(userData);
    }
  }, [userData]);

  const fetchCareerRecommendation = async (userData: any) => {
    setLoading(true);
    try {
      setTimeout(() => {
        // Assuming API would return
        setCareerResult(
          "Software Developer based on your skills in programming and problem-solving."
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      toaster.danger("Failed to load career suggestions. Please try again.");
      setLoading(false);
    }
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
        Suggested Career Path
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
        {loading ? (
          <Spinner />
        ) : (
          careerResult || "Your result will appear here."
        )}
      </Pane>
      <Button
        intent="success"
        appearance="primary"
        onClick={() => fetchCareerRecommendation(userData)}
        disabled={loading}
        marginBottom={12}
      >
        Refresh Recommendation
      </Button>
    </Pane>
  );
};

export default Results;
