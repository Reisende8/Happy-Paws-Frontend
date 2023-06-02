export interface MedicInterface {
  medicId: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  specializationId: string;
  estimatedPrice: number;
  animals: AnimalInterface[];
}

export interface AnimalInterface {
  id: string;
  name: string;
}

export interface AddMedicInterface {
  firstName: string;
  lastName: string;
  estimatedPrice: number;
  specializationId: string;
  animalIds: number[];
}

export interface SpecializationInterface {
  id: number;
  name: string;
}
export interface MedicErrorsInterface {
  firstNameError: string;
  lastNameError: string;
  specializationError: string;
  estimatedPriceError: string;
  animalsError: string;
}
