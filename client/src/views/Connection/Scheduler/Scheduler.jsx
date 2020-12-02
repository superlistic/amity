import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './Scheduler.css';
import { AccentButton } from '../../../components/button';
import { getSchedule, addToSchedule } from '../../../actions/scheduler';

const Scheduler = ({ getSchedule, addToSchedule, meetings }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    console.log('GET_SCHEDULE');
    getSchedule();
  }, []);

  const onSaveDate = () => {
    const time = new Date(startDate).getTime();
    console.log(time);
    console.log(Date.now());
    addToSchedule({ time });
  };

  console.log(meetings);

  const scheduledMeetings = meetings.map(meeting => {
    if (meeting !== undefined) {
      return (
        <p
          className="scheduled__session"
          key={`${meeting.time}-${Math.random()}`}
        >
          {meeting !== undefined ? new Date(meeting.time).toUTCString() : ''}
        </p>
      );
    }
  });

  // new Date(message.date).toLocaleTimeString();
  return (
    <div className="scheduler">
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
      <section className="scheduled__sessions">
        {meetings.length > 0 && scheduledMeetings}
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  meetings: state.scheduler.meetings,
});

export default connect(mapStateToProps, { getSchedule, addToSchedule })(
  Scheduler
);
