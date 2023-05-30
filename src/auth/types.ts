import { LogInInterface } from "../logIn/types";

export interface UseAuthInterface {
  logIn: (loginState: LogInInterface) => Promise<void>;
}

export type UseAuth = () => UseAuthInterface;
