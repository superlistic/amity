import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './Scheduler.css';
import { AccentButton } from '../../../components/button';
import { getSchedule, addToSchedule } from '../../../actions/scheduler';

const Scheduler = ({ getSchedule, addToSchedule }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getSchedule();
  }, []);

  const onSaveDate = () => {
    console.log('CLICKED');
    const newDateAsTimeStamp = new Date(startDate).getTime();

    // addToSchedule(payload);
  };
  return (
    <div className="scheduler">
      <p className="settings__title">Pick a date</p>
      <p className="category__description">
        When do you want to connect with a colleague?
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
      <AccentButton onClick={onSaveDate}>Save to calendar</AccentButton>

      <p className="scheduler__sub-title">Your Scheduled Connections</p>
      <section className="scheduled__sessions">{'january 25th'}</section>
    </div>
  );
};

const mapStateToProps = state => {
  //
};

export default connect(mapStateToProps, { getSchedule, addToSchedule })(
  Scheduler
);
