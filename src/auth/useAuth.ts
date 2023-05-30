import { LogInInterface } from "../logIn/types";
import { UseAuth } from "./types";

export const useAuth: UseAuth = () => {
  const logIn = async (logInData: LogInInterface) => {
    console.log(logInData);
  };
  return { logIn };
};
