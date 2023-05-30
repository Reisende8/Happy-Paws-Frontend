import { LogInInterface } from "../logIn/types";
import {
  RegisterClientInterface,
  RegisterClinicInterface,
} from "../register/types";

export interface UseAuthInterface {
  logIn: (logInData: LogInInterface) => Promise<void>;
  registerClient: (
    registerClientData: RegisterClientInterface
  ) => Promise<void>;
  registerClinic: (
    registerClinicData: RegisterClinicInterface
  ) => Promise<void>;
}

export type UseAuth = () => UseAuthInterface;
