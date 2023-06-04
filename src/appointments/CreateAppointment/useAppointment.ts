import { useSteps, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { apiClient, authorize } from "../../utils/apiClient";
import { nextDate } from "../../utils/validators";
import {
  AppointmentErrorInterface,
  AppointmentInterface,
  RecommnendedMedicInterface,
  SummaryAppointmentInterface,
  UseAppointment,
} from "../types";

export const steps = [
  { title: "First Step", description: "Appointment Info" },
  { title: "Second Step", description: "Select Medic " },
  { title: "Third Step", description: "Select Time" },
  { title: "Final Step", description: "Summary" },
];

export const useAppointment: UseAppointment = () => {
  const toast = useToast();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [recommendedMedicsData, setRecommendedMedicsData] = useState<
    RecommnendedMedicInterface[]
  >([]);
  const [selectedMedicInfo, setSelectedMedicInfo] =
    useState<RecommnendedMedicInterface>({} as RecommnendedMedicInterface);
  const [createdAppointmentData, setCreatedAppointmentData] =
    useState<SummaryAppointmentInterface>({} as SummaryAppointmentInterface);
  const [appointmentData, setAppointmentData] = useState<AppointmentInterface>({
    date: nextDate(),
    description: "",
    specializationId: "0",
    animalAge: 0,
    animalId: "0",
    veterinarianId: "",
    slot: -1,
  } as AppointmentInterface);

  const [appointmentErrors, setAppointmentErrors] =
    useState<AppointmentErrorInterface>({
      dateError: "",
      descriptionError: "",
      specializationError: "",
      animalAgeError: "",
      animalError: "",
      veterinarianError: "",
      slotError: "",
    });

  const getRecommnendedMedics = async (appointment: AppointmentInterface) => {
    setLoading(true);
    await apiClient
      .post(
        "/api/medic/get-recommended-medics",
        {
          animalId: appointment.animalId,
          date: appointment.date,
          specializationId: appointment.specializationId,
        },
        authorize()
      )
      .then((res) => {
        setRecommendedMedicsData(res.data);
        setActiveStep(activeStep + 1);
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      });
    setLoading(false);
  };

  const onSelectMedic = (medicId: string) => {
    setSelectedMedicInfo(
      recommendedMedicsData.filter((m) => m.medicId === medicId)[0]
    );
    setAppointmentData({
      ...appointmentData,
      veterinarianId: medicId,
      slot: -1,
    });
    setAppointmentErrors({ ...appointmentErrors, slotError: "" });
    setActiveStep(activeStep + 1);
  };

  const createAppointment = async (appointmentData: AppointmentInterface) => {
    setLoading(true);
    await apiClient
      .post("/api/appointment/create-appointment", appointmentData, authorize())
      .then((res) => {
        setCreatedAppointmentData(res.data);
        setActiveStep(activeStep + 1);
      })
      .catch((err) => {
        console.error(err);
        return toast({
          title: "ERROR",
          status: "error",
          position: "top-right",
          description: `${err.response.data.message}`,
        });
      });
    setLoading(false);
  };

  return {
    activeStep,
    setActiveStep,
    appointmentData,
    setAppointmentData,
    appointmentErrors,
    setAppointmentErrors,
    loading,
    getRecommnendedMedics,
    recommendedMedicsData,
    onSelectMedic,
    selectedMedicInfo,
    createAppointment,
    createdAppointmentData,
  };
};
