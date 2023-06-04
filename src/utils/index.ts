import { AnimalInterface, SpecializationInterface } from "../medics/types";

export const specializations: SpecializationInterface[] = [
  {
    id: 0,
    name: "Surgery",
  },
  {
    id: 1,
    name: "Ophthalmology",
  },
  {
    id: 2,
    name: "Dermatology",
  },
  {
    id: 3,
    name: "Radiology",
  },
  {
    id: 4,
    name: "Dentistry",
  },
  {
    id: 5,
    name: "General practitioner",
  },
];

export const animals: AnimalInterface[] = [
  {
    id: "0",
    name: "Cat",
  },
  {
    id: "1",
    name: "Dog",
  },
];

export const timeIntervals = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
];
