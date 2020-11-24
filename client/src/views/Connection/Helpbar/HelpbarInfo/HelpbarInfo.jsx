import React from 'react';
import './HelpbarInfo.css';

const HelpbarInfo = ({ suggestion }) => {
  const onHandleSuggestion = () => {
    console.log(suggestion);
  };

  return (
    <div className="helpbar-info">
      <hr className="helpbar-info__divider" />
      <h5 className="helpbar-info__title">Topic Suggestions</h5>
      <p className="helpbar-info__title"> Click to send message</p>
      <p
        className="helpbar-info__suggestion"
        onClick={() => onHandleSuggestion()}
      >
        {suggestion}
      </p>
    </div>
  );
};

export default HelpbarInfo;
