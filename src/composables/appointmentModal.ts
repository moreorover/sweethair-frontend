import { Appointment } from '@/services/AppointmentService';

const emptyAppointment: Appointment = { start: new Date().toISOString(), customers: [], transactions: [] };

export const useAppointmentModal = function () {
  const cleanAppointment = (appointment: Appointment): Appointment => {
    for (const propName in appointment) {
      if (
        appointment[propName] === null ||
        appointment[propName] === undefined ||
        appointment[propName] === '' ||
        appointment[propName] === []
      ) {
        delete appointment[propName];
      }
      delete appointment.createdOn;
      delete appointment.modifiedOn;
    }
    return appointment;
  };

  return {
    emptyAppointment,

    cleanAppointment,
  };
};

export default useAppointmentModal;
