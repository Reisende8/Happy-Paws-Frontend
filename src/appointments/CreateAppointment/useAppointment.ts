import { useSteps, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AppointmentErrorInterface,
  AppointmentInterface,
  RecommnendedMedicInterface,
  UseAppointment,
} from "../types";
import { nextDate } from "../../utils/validators";
import { apiClient, authorize } from "../../utils/apiClient";

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
        console.log(res.data);
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
    });
    setActiveStep(activeStep + 1);
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
  };
};
