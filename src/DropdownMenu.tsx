import React from "react";
import { useNavigate } from "react-router-dom";


const DropdownMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      aria-label="Navigate to page"
      style={{
        margin: "20px",
        backgroundColor: "#f8f8f8",
        border: "2% solid #ccc",
        borderRadius: "4%",
        width: "10%", // Adjust width as needed
        boxShadow: "0 2% 6% rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        marginTop: "5%",
      }}
    >
      <option value="" disabled>
        Choose a page
      </option>
      <option value="/home">Home</option>
      <option value="/basicQuestionPage">Basic Quiz</option>
      <option value="/detailedQuestionPage">Detailed Quiz</option>
      <option value="/Results">Results</option>
    </select>
  );
};

export default DropdownMenu;
