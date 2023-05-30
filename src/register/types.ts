export type AccountTypeEnum = "Client" | "Clinic";

export interface RegisterClientInterface {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterClientErrorInterface {
  firstNameError: string;
  lastNameError: string;
  phoneNumberError: string;
  emailError: string;
  passwordError: string;
  repeatPasswordError: string;
}

export interface RegisterClinicInterface {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterClinicErrorInterface {
  emailError: string;
  nameError: string;
  addressError: string;
  phoneNumberError: string;
  passwordError: string;
  repeatPasswordError: string;
}
