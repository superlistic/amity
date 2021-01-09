import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './Suggestions.css';
import Suggestion from './Suggestion';
import { setSuggestion } from '../../../../actions/connection';

const Suggestions = ({
  sendMessage,
  setSuggestion,
  currentSuggestion,
  isSearching,
  isConnected,
}) => {
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
      text: 'How did you meet your boss?',
    },
    {
      id: 5,
      text: 'What’s your favorite form of social media (besides Amity ;) )?',
    },
    {
      id: 6,
      text: 'What was the last good book you read?',
    },
  ];

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const queue = async array => {
    while (array.length > 0) {
      const suggestion = array.shift();
      await setSuggestion(suggestion);
      await timeout(14000);
    }
  };

  useEffect(() => {
    queue(listOfSuggestions);
  }, []);

  const getSuggestion = suggestion => {
    return suggestion.map(s => (
      <Suggestion
        sendMessage={sendMessage}
        suggestion={s.text}
        key={s.id}
        id={s.id}
      />
    ));
  };

  if (!isSearching && isConnected)
    return (
      <div className="suggestions">
        <hr className="suggestions__divider" />
        <p className="suggestions__title">
          Click on a suggestion to send it in chat.
        </p>
        {currentSuggestion && currentSuggestion.length !== 0
          ? getSuggestion(currentSuggestion)
          : ''}
      </div>
    );
};
const mapStateToProps = state => ({
  isConnected: state.connection.isConnected,
  currentSuggestion: state.connection.currentSuggestion,
  isSearching: state.connection.isSearching,
});

export default connect(mapStateToProps, { setSuggestion })(Suggestions);
