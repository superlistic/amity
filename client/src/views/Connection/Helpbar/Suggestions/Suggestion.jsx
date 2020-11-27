import React from 'react';
import { motion } from 'framer-motion';
import { suggestionVariant } from '../../../../animations';

const Suggestion = ({ suggestion }) => {
  const onHandleSuggestion = suggestion => {
    console.log(suggestion);
    // sendMessage(suggestion.text);

    //remove from suggestions?/dont show atleast
  };

  return (
    <div>
      <motion.p
        variants={suggestionVariant}
        initial="initial"
        animate="animate"
        className="suggestion"
        onClick={() => onHandleSuggestion(suggestion)}
      >
        {suggestion}
      </motion.p>
    </div>
  );
};

export default Suggestion;
