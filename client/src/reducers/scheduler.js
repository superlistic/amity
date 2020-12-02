import { PUT_SCHEDULE, GET_SCHEDULE, SCHEDULE_ERROR } from '../actions/types';

const initState = { meetings: [] };

export default function scheduler(state = initState, action) {
  console.log(state, action);
  const { type, payload } = action;
  switch (type) {
    case GET_SCHEDULE:
      console.log(payload.data);
      return { ...state, meetings: payload.data.meetings };
    case PUT_SCHEDULE:
      const { id, time } = payload.data;
      if (state.meetings.find(m => m.id === id)) {
        return state;
      }
      return {
        ...state,
        meetings: [...state.meetings, { id, time }],
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
}
