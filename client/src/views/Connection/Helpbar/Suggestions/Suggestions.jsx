import React from 'react';
import './Suggestions.css';

const Suggestions = ({ suggestion }) => {
  const onHandleSuggestion = () => {
    console.log(suggestion);
  };

  return (
    <div className="suggestions">
      <hr className="suggestions__divider" />
      <h5 className="suggestions__title">Topic Suggestions</h5>
      <p className="suggestions__title"> Click to send message</p>
      <p className="suggestion" onClick={() => onHandleSuggestion()}>
        {suggestion}
      </p>
    </div>
  );
};

export default Suggestions;
