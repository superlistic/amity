import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './Scheduler.css';
import { AccentButton } from '../../../components/button';

const Scheduler = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="scheduler">
      <p className="settings__title">Pick a date</p>
      <p className="category__description">
        When you want to connect to a colleague
      </p>
      <DatePicker
        placeholderText="Choose here"
        className="schedule__picker"
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <AccentButton> Save to calendar</AccentButton>

      <p className="category__description">Your Scheduled Connections</p>
      <section className="scheduled__sessions">{'january 25th'}</section>
    </div>
  );
};

export default Scheduler;
