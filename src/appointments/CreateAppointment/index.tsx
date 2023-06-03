import React, { createContext } from "react";
import { UseAppointmentInterface } from "../types";
import { useAppointment } from "./useAppointment";
import { CreateAppointmentComponent } from "./createAppointmentPage";

export const AppointmentContext = createContext<UseAppointmentInterface>(
  {} as UseAppointmentInterface
);

export const AppointmentPage = () => {
  const appointment = useAppointment();
  return (
    <AppointmentContext.Provider value={appointment}>
      <CreateAppointmentComponent />
    </AppointmentContext.Provider>
  );
};
