export function getAppointmentsForDay(state, day) {
  const selectedDayObj = state.days.find((item) => item.name === day);

  if (!selectedDayObj) return [];
  else {
    const appointments = selectedDayObj.appointments.map(
      (item) => state.appointments[item]
    );
    return appointments;
  }
}
export function getInterview(state, interview) {
  if (!interview) return null;
  else {
    const interviewersList = state.interviewers; 
    const interviewerId = interview.interviewer;

    return { ...interview, interviewer: interviewersList[interviewerId] }; 
  }
}
export function getInterviewersForDay(state, day) {
  const selectedDayObj = state.days.find((item) => item.name === day);

  if (!selectedDayObj) return [];
  else {
    const interviewersArr = selectedDayObj.interviewers.map(
      (interviewerId) => state.interviewers[interviewerId]
    );
    return interviewersArr;
  }
} 
