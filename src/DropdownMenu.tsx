import { SelectField } from "evergreen-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

// dropdown menu
const DropdownMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };

  return (
    <SelectField
      onChange={handleChange}
      defaultValue=""
      aria-label="Navigate to page"
      style={{
        margin: "1%",
        backgroundColor: "#f8f8f8",
        border: "2% solid #ccc",
        borderRadius: "4%",
        width: "10%",
        boxShadow: "0 2% 6% rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        marginTop: "5%",
        position: "relative",
      }}
    >
      <option value="" disabled>
        Choose a page
      </option>
      <option value="/home">Home</option>
      <option value="/basicQuestionPage">Basic Quiz</option>
      <option value="/detailedQuestionPage">Detailed Quiz</option>
      <option value="/Results">Results</option>
    </SelectField>
  );
};

export default DropdownMenu;
