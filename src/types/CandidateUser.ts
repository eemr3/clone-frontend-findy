import { CandidateUserRegister } from "./CandidateUserRegister";

export type CandidateUser = Omit<CandidateUserRegister, "password" | "confirmPassword"> & {
  id: number;
  roles: string;
  provider: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}
