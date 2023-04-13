import { HTMLAttributes } from "react";
import { Text } from "../Text";

interface TextErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
  errorMessage: string;
}

export function TextErrorMessage({
  errorMessage,
  className = "",
  ...rest
}: TextErrorMessageProps) {
  return (
    <Text
      type="md"
      className={`text-[1.8rem] font-bold leading-[1.924rem] text-red ${className}`}
      {...rest}
    >
      {errorMessage}
    </Text>
  );
}
