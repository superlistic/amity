import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';

import 'react-datepicker/dist/react-datepicker.css';
import './Scheduler.css';
import { AccentButton } from '../../../components/button';
import { getSchedule, addToSchedule } from '../../../actions/scheduler';

const Scheduler = ({ getSchedule, addToSchedule, meetings }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  const onSaveDate = () => {
    const time = new Date(startDate).getTime();
    addToSchedule({ time });
  };

  const orderedMeetings = meetings.sort((a, b) => a.time - b.time);
  const scheduledMeetings = meetings.map(meeting => {
    return (
      <p className="scheduled__session" key={`${meeting.id}`}>
        {new Date(meeting.time).toDateString()} at{' '}
        {new Date(meeting.time).toLocaleTimeString()}
      </p>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="scheduler"
    >
      <p className="settings__title">Your Calendar</p>
      <p className="category__description">
        When do you want to e-meet with a colleague?
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

      <section className="scheduled__sessions">{scheduledMeetings}</section>
    </motion.div>
  );
};

const mapStateToProps = state => ({
  meetings: state.scheduler.meetings,
});

export default connect(mapStateToProps, { getSchedule, addToSchedule })(
  Scheduler
);
