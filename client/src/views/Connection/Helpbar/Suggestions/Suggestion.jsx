import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import { clickedSuggestion } from '../../../../actions/connection';
import { suggestionVariant } from '../../../../animations';

const Suggestion = ({ suggestion, sendMessage, id, clickedSuggestion }) => {
  const onHandleSuggestion = suggestion => {
    sendMessage(suggestion);
    clickedSuggestion();
  };

  return (
    <>
      <motion.p
        variants={suggestionVariant}
        custom={id}
        initial="initial"
        animate="animate"
        className="suggestion"
        onClick={() => onHandleSuggestion(suggestion)}
      >
        {suggestion}
      </motion.p>
    </>
  );
};

export default connect(null, { clickedSuggestion })(Suggestion);
