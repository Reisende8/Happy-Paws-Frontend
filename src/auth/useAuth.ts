import { LogInInterface } from "../logIn/types";
import {
  RegisterClientInterface,
  RegisterClinicInterface,
} from "../register/types";
import { UseAuth } from "./types";

export const useAuth: UseAuth = () => {
  const logIn = async (logInData: LogInInterface) => {
    console.log(logInData);
  };
  const registerClient = async (
    registerClientData: RegisterClientInterface
  ) => {
    console.log(registerClientData);
  };
  const registerClinic = async (
    registerClinicData: RegisterClinicInterface
  ) => {
    console.log(registerClinicData);
  };
  return { logIn, registerClient, registerClinic };
};
