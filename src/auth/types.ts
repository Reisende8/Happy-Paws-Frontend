import { ToastId } from "@chakra-ui/react";
import { LogInInterface } from "../logIn/types";
import {
  RegisterClientInterface,
  RegisterClinicInterface,
} from "../register/types";

export interface UseAuthInterface {
  logInFromActivation: (token: string) => void;
  logIn: (logInData: LogInInterface) => Promise<void | ToastId>;
  registerClient: (
    registerClientData: RegisterClientInterface
  ) => Promise<void>;
  registerClinic: (
    registerClinicData: RegisterClinicInterface
  ) => Promise<void>;
  logOut: () => void;
  user: ClientInterface | ClinicInterface | null;
  didMount: boolean;
}

export type UseAuth = () => UseAuthInterface;

export interface ClientInterface {
  userId: string;
  clientId: string;
  roleId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ClinicInterface {
  userId: string;
  clinicId: string;
  roleId: number;
  email: string;
  address: string;
  name: string;
  phoneNumber: string;
}

export interface ErrorInterface {
  error: string;
  message: string;
}
