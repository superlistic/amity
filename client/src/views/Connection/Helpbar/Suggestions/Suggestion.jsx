import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import { suggestionVariant } from '../../../../animations';

const Suggestion = ({ suggestion, sendMessage }) => {
  const onHandleSuggestion = suggestion => {
    // console.log(suggestion.text);
    sendMessage(suggestion);

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

export default connect(null, {})(Suggestion);
