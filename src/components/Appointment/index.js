import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

function Appointment(props) {
  const { id, time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(id, interview).then(() => transition(SHOW));
  }
  
  function remove() {
    transition(SAVING);
    props.cancelInterview(id).then(() => transition(EMPTY));
  }
  function confirmRemove() {
    transition(CONFIRM);
  }
  function onEdit() {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={time} />
      {/* {interview ? (<Show student={interview.student} interviewer={interview.interviewer} onEdit onDelete />) : (<Empty onAdd/> )} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={confirmRemove}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Loading"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete your booking?"}
          onCancel={back}
          onConfirm={remove}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}
export default Appointment;
