export interface UseAppointmentInterface {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
}

export type UseAppointment = () => UseAppointmentInterface;
