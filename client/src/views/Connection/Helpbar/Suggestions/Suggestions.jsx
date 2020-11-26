import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import './Suggestions.css';
import { suggestionVariant } from '../../../../animations';

const Suggestions = () => {
  const [queuedElement, setQueuedElement] = useState([]);
  const onHandleSuggestion = () => {
    // console.log(suggestion);
    //Send message via WEBRTC here
    //remove from suggestions?/dont show atleast
  };

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
      text: 'What’s your favorite form of social media?',
    },
    {
      id: 6,
      text: 'What was the last good book you read?',
    },
  ];

  const displaySuggestion = el => {
    return (
      <motion.p
        variants={suggestionVariant}
        initial="initial"
        animate="animate"
        className="suggestion"
        onClick={() => onHandleSuggestion()}
      >
        {el.text}
      </motion.p>
    );
  };

  // function timeout(delay) {
  //   return new Promise(res => setTimeout(res, delay));
  // }

  // const displaySuggestions = async (array) => {
  //   return array.map(el =>  {
  //     await timeout(1000);
  //     displaySuggestion(el)
  //   });
  // }
  const queue = array => {
    if (queuedElement.length === 0) {
      console.log(queuedElement);
    }

    // return;
  };

  useEffect(() => {
    const element = queue(listOfSuggestions);
  }, []);

  return (
    <div className="suggestions">
      <hr className="suggestions__divider" />
      <h5 className="suggestions__title">Topic Suggestions</h5>
      <p className="suggestions__title"> Click to send message</p>
      {displaySuggestion(listOfSuggestions[1])}
    </div>
  );
};

export default Suggestions;
