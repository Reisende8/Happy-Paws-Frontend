import {
  CheckboxGroup,
  Flex,
  Text,
  Checkbox,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { HPButton } from "../../../common/HPButton";
import { AppointmentContext } from "..";
import { HPInput } from "../../../common/HPInput";
import { HPSelect } from "../../../common/HPSelect";
import { animals, specializations } from "../../../utils";
import { HPTextArea } from "../../../common/HPTextArea";
import {
  AnimalInterface,
  SpecializationInterface,
} from "../../../medics/types";
import { AppointmentErrorInterface } from "../../types";
import { nextDate } from "../../../utils/validators";

export const AppointmentInfoComponent: React.FC = () => {
  const {
    activeStep,
    setActiveStep,
    appointmentData,
    setAppointmentData,
    appointmentErrors,
    setAppointmentErrors,
    loading,
    getRecommnendedMedics,
  } = useContext(AppointmentContext);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setAppointmentErrors({
        ...appointmentErrors,
        dateError: "This field is required!",
      });
    } else {
      setAppointmentErrors({ ...appointmentErrors, dateError: "" });
    }
    setAppointmentData({
      ...appointmentData,
      date: e.target.value,
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!e.target.value) {
      setAppointmentErrors({
        ...appointmentErrors,
        descriptionError: "This field is required!",
      });
    } else {
      setAppointmentErrors({ ...appointmentErrors, descriptionError: "" });
    }
    setAppointmentData({
      ...appointmentData,
      description: e.target.value,
    });
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!e.target.value) {
      setAppointmentErrors({
        ...appointmentErrors,
        specializationError: "This field is required!",
      });
    } else {
      setAppointmentErrors({ ...appointmentErrors, specializationError: "" });
    }
    setAppointmentData({
      ...appointmentData,
      specializationId: e.target.value,
    });
  };

  const handleAnimalAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setAppointmentErrors({
        ...appointmentErrors,
        animalAgeError: "This field is required!",
      });
    } else {
      setAppointmentErrors({ ...appointmentErrors, animalAgeError: "" });
    }
    setAppointmentData({
      ...appointmentData,
      animalAge: parseInt(e.target.value),
    });
  };

  const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      setAppointmentErrors({
        ...appointmentErrors,
        animalError: "This field is required!",
      });
    } else {
      setAppointmentErrors({ ...appointmentErrors, animalError: "" });
    }
    setAppointmentData({
      ...appointmentData,
      animalId: e.target.value,
    });
  };

  const handleAppointmentErrors = () => {
    const errors: AppointmentErrorInterface = {
      dateError: "",
      descriptionError: "",
      specializationError: "",
      animalAgeError: "",
      animalError: "",
      veterinarianError: "",
      slotError: "",
    };
    if (appointmentData.date === "") {
      errors.dateError = "This field is required!";
    }
    if (appointmentData.description === "") {
      errors.descriptionError = "This field is required!";
    }
    if (appointmentData.specializationId === "") {
      errors.specializationError = "This field is required!";
    }
    if (!appointmentData.animalAge) {
      errors.animalAgeError = "This field is required!";
    }
    if (appointmentData.animalId === "") {
      errors.animalError = "This field is required!";
    }

    return errors;
  };

  const handleSuccessClick = () => {
    const errors = handleAppointmentErrors();
    if (
      errors.dateError === "" &&
      errors.descriptionError === "" &&
      errors.specializationError === "" &&
      errors.animalAgeError === "" &&
      errors.animalError === ""
    ) {
      setAppointmentData(appointmentData);
      getRecommnendedMedics(appointmentData);
    }
    setAppointmentErrors(errors);
  };

  return (
    <Flex
      borderRadius={"20px"}
      height="100%"
      w="70%"
      px={4}
      py={4}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      gap={4}
    >
      <Flex w="100%" gap={4}>
        <HPInput
          label={"Animal Age"}
          error={appointmentErrors.animalAgeError}
          value={appointmentData.animalAge}
          onChange={handleAnimalAgeChange}
        />

        <HPSelect
          label={"Animal"}
          options={animals as AnimalInterface[]}
          error={appointmentErrors.animalError}
          value={appointmentData.animalId}
          onChange={handleAnimalChange}
        />
      </Flex>
      <HPTextArea
        label="Description"
        error={appointmentErrors.descriptionError}
        value={appointmentData.description}
        onChange={handleDescriptionChange}
      />
      <HPInput
        label="Appointment Date"
        type="date"
        min={nextDate()}
        error={appointmentErrors.dateError}
        value={appointmentData.date}
        onChange={handleDateChange}
      />

      <HPSelect
        label={"Medic Specialization"}
        options={specializations as SpecializationInterface[]}
        error={appointmentErrors.specializationError}
        value={appointmentData.specializationId}
        onChange={handleSpecializationChange}
      />

      <Flex gap={40} w="100%" justifyContent={"center"}>
        <HPButton
          m={0}
          colorScheme="primary"
          onClick={handleSuccessClick}
          isLoading={loading}
        >
          Next
        </HPButton>
      </Flex>
    </Flex>
  );
};
