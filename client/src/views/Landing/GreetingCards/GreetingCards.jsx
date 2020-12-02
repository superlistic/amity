import React from 'react';
import './GreetingCards.css';

const GreetingCards = () => {
  return (
    <div className="greeting__cards">
      <div className="greeting__card">
        <p className="greeting__text">
          Perfect for getting to know colleges you don't work with directly.
        </p>
      </div>
      <div className="greeting__card">
        <p className="greeting__text">
          Ideal for scheduling time in your calendar for that college you used
          to chat with in the corridors.
        </p>
      </div>
      <div className="greeting__card">
        <p className="greeting__text">
          Finest tool for interdepartmental socialising, communications and
          knowlege sharing.
        </p>
      </div>
    </div>
  );
};

export default GreetingCards;
