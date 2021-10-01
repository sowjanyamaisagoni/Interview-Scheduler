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
