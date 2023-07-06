import { LoginUser } from './LoginUser';

export interface CandidateUserRegister extends LoginUser {
  name: string;
  confirmPassword: string | undefined;
  accept_terms: true | undefined;
  recoverToken?: string;
  id?: string;
}
