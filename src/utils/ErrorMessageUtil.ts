import { AxiosError } from "axios";
import { ErrorFindy } from "../types/ErrorFindy";

export function getErrorMessage(error: any): string {
  const errorAxios = error as AxiosError<ErrorFindy>;

  if (typeof errorAxios.response?.data === 'undefined')
    return errorAxios.message

  let message = ""
  for (const errorMessage of errorAxios.response.data.message) {
    if (message)
      message += "\n";
    message += `${errorMessage}`;
  }

  return message
}