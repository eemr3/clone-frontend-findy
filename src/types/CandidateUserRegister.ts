import { LoginUser } from "./LoginUser"

export type CandidateUserRegister = LoginUser & {
  name: string;
  confirmPassword: string;
  accept_terms: boolean;
}

