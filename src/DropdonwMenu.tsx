import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue="" aria-label="Navigate to page">
      <option value="" disabled>Choose a page</option>
      <option value="/home">Home</option>
      <option value="/basicQuestionPage">Basic Quiz</option>
      <option value="/detailedQuestionPage">Detailed Quiz</option>
      <option value="/Results">Results</option>
    </select>
  );
}

export default DropdownMenu;
