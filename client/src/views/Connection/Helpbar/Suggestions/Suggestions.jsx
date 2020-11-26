import React from 'react';
import { motion } from 'framer-motion';

import './Suggestions.css';
import {
  suggestionVariant,
  suggestionOpacityVariant,
} from '../../../../animations';

const Suggestions = ({ suggestion }) => {
  const onHandleSuggestion = () => {
    console.log(suggestion);
    //Send message via WEBRTC here

    //remove from suggestions?/dont show atleast
  };

  return (
    <div className="suggestions">
      <hr className="suggestions__divider" />
      <h5 className="suggestions__title">Topic Suggestions</h5>
      <p className="suggestions__title"> Click to send message</p>
      <motion.div
        variants={suggestionOpacityVariant}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={suggestionVariant}
          initial="initial"
          animate="animate"
          className="suggestion"
          onClick={() => onHandleSuggestion()}
        >
          {suggestion}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Suggestions;
