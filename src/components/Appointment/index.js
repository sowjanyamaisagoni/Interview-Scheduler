import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


function Appointment(props) {
  const { id, time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {props.interview ? (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit
          onDelete
        />
      ) : (
        <Empty onAdd />
      )}
    </article>
  );
}

export default Appointment;
