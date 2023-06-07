import { AnimalInterface } from "../medics/types";

export interface ClientForAppointmentInterface {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface PreviousAppointmentInterface {
  id: string;
  date: string;
  description: string;
  slot: number;
  status: string;
  animal: AnimalInterface;
  animalAge: number;
  client: ClientForAppointmentInterface;
}
