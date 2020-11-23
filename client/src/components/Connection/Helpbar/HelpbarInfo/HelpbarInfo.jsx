import React from 'react';
import './HelpbarInfo.css';

const HelpbarInfo = ({ suggestion }) => {
  return (
    <div className="helpbar-info">
      <hr />
      <h5 className="helpbar-info__title">Topic Suggestions</h5>
      <p className="helpbar-info__suggestion">{suggestion}</p>
    </div>
  );
};

export default HelpbarInfo;
