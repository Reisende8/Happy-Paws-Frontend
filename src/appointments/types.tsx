import { AnimalInterface } from "../medics/types";

export interface UseAppointmentInterface {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
  appointmentData: AppointmentInterface;
  setAppointmentData: (ap: AppointmentInterface) => void;
  appointmentErrors: AppointmentErrorInterface;
  setAppointmentErrors: (err: AppointmentErrorInterface) => void;
  loading: boolean;
  getRecommnendedMedics: (ap: AppointmentInterface) => Promise<void>;
  recommendedMedicsData: RecommnendedMedicInterface[];
  onSelectMedic: (medicId: string) => void;
  selectedMedicInfo: RecommnendedMedicInterface;
  createAppointment: (ap: AppointmentInterface) => Promise<void>;
  createdAppointmentData: SummaryAppointmentInterface;
}

export type UseAppointment = () => UseAppointmentInterface;

export interface AppointmentInterface {
  date: string;
  description: string;
  specializationId: string;
  animalAge: number;
  animalId: string;
  veterinarianId: string;
  slot: number;
}

export interface AppointmentErrorInterface {
  dateError: string;
  descriptionError: string;
  specializationError: string;
  animalAgeError: string;
  animalError: string;
  veterinarianError: string;
  slotError: string;
}

export interface RecommnendedMedicInterface {
  medicId: string;
  firstName: string;
  lastName: string;
  animals: AnimalInterface[];
  clinicId: string;
  estimatedPrice: number;
  specializationId: string;
  takenSlots: number[];
  clinic: ClinicInfoInterface;
}

export interface ClinicInfoInterface {
  id: string;
  address: string;
  name: string;
  phoneNumber: string;
}

interface AppointmentMedic {
  id: string;
  firstName: string;
  lastName: string;
  estimatedPrice: number;
  specializationId: string;
}

export interface SummaryAppointmentInterface {
  id: string;
  date: string;
  slot: number;
  description: string;
  animal: AnimalInterface;
  animalAge: number;
  clientId: string;
  status: string;
  medic: AppointmentMedic;
  clinic: ClinicInfoInterface;
}
