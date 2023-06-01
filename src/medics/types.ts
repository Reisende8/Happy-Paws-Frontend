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
