//import React from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react"; 
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview ,getInterviewersForDay} from "helpers/selectors";

export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({...state,day});
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log('all', all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  console.log("Application.js > today:", state.day);
  
    const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
      const interview = getInterview(state, appointment.interview);
      console.log("getInterview interview", interview);
      console.log("appointment", appointment);

      return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interview={getInterview(state, appointment.interview)}
          interviewers={getInterviewersForDay(state, state.day)}
          bookInterview={bookInterview}
        />
      );
    });
  
  function bookInterview(id, interview) {
    console.log("bookInterview id", id); // id = 2
    console.log("bookInterview interview", interview); // interview = { student: 'sam', interviewer: 3}

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState((prev) => ({
      ...prev,
      appointments,
    }));
  }
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments}
        {/* {appointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))} */}
        <Appointment key={"last"} time={"5PM"} />
      </section>
    </main>
  );
}
