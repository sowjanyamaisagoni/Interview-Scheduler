import { useState } from "react";
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prevState) => ({ ...prevState, day }));

  const bookInterview = (id, interview) => {
    // id = 2, interview = {student: 'sam', interviewer: 3}

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState((prev) => ({ ...prev, appointments }));
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  return { state, setState, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
