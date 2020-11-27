import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import './Suggestions.css';
import Suggestion from './Suggestion';
import { suggestionVariant } from '../../../../animations';
import { setSuggestion } from '../../../../actions/connection';

const Suggestions = ({ sendMessage, setSuggestion, currentSuggestion }) => {
  const [queuedElement, setQueuedElement] = useState();
  console.log(currentSuggestion);
  // const onHandleSuggestion = suggestion => {
  //   console.log(suggestion);
  //   // sendMessage(suggestion.text);

  //   //remove from suggestions?/dont show atleast
  // };

  const listOfSuggestions = [
    {
      id: 1,
      text: 'Tell me about yourself.',
    },
    {
      id: 2,
      text: 'Have you done anything exciting lately?',
    },
    {
      id: 3,
      text: 'What made you smile today?',
    },
    {
      id: 4,
      text: 'How did you meet the host?',
    },
    {
      id: 5,
      text:
        'What’s your favorite form of social media (besides Amity ofc ;) )?',
    },
    {
      id: 6,
      text: 'What was the last good book you read?',
    },
  ];

  // const displaySuggestion = suggestion => {
  //   return (
  //     <motion.p
  //       variants={suggestionVariant}
  //       initial="initial"
  //       animate="animate"
  //       className="suggestion"
  //       onClick={() => onHandleSuggestion(suggestion)}
  //     >
  //       {suggestion.text}
  //     </motion.p>
  //   );
  // };

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  // const displaySuggestions = async (array) => {
  //   return array.map(el =>  {
  //     await timeout(1000);
  //     displaySuggestion(el)
  //   });
  // }

  const queue = async array => {
    while (array.length > 0) {
      const suggestion = array.shift();
      console.log(suggestion);
      setSuggestion(suggestion.text);
      // setQueuedElement(<Suggestion suggestion={suggestion.text} />);
      await timeout(14000);
    }
  };

  useEffect(() => {
    queue(listOfSuggestions);
  }, []);

  const getSuggestion = suggestion => {
    return <Suggestion suggestion={suggestion[0]} />;
  };

  return (
    <div className="suggestions">
      <hr className="suggestions__divider" />
      <p className="suggestions__title">
        Click on suggestion to send it in chat
      </p>
      {currentSuggestion.length !== 0 ? getSuggestion(currentSuggestion) : ''}
    </div>
  );
};
const mapStateToProps = state => ({
  currentSuggestion: state.connection.currentSuggestion,
});

export default connect(mapStateToProps, { setSuggestion })(Suggestions);
