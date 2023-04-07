import { HTMLAttributes, ReactNode } from "react";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  type: "lg" | "md" | "sm";
}

export function Text({ children, type, className = "", ...rest }: TextProps) {
  const typeClassName =
    type == "lg"
      ? "text-[3.2rem] leading-[3.2rem] font-semibold"
      : type == "md"
      ? "text-[2.4rem] leading-[3.2rem] font-medium"
      : "text-[1.6rem] leading-[2.4rem] font-medium";

  return (
    <span className={`${typeClassName} ${className}`} {...rest}>
      {children}
    </span>
  );
}
