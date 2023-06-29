import { HTMLAttributes, ReactNode } from "react";
import { TypeStyle } from "../types/TypeStyle";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  type: "lg" | "md" | "sm";
}

export function Text({ children, type, className = "", ...rest }: TextProps) {

  const listTypeStyle: TypeStyle[] = [
    {
      type: "lg",
      style: "text-[3.2rem] leading-[3.2rem] font-semibold"
    },
    {
      type: "md",
      style: "text-[2.4rem] leading-[3.2rem] font-medium"
    },
    {
      type: "sm",
      style: "text-[1.2rem] leading-[1.56rem] font-medium"
    }
  ];

  const typeClassName = listTypeStyle.filter(
    (typeStyle) => typeStyle.type == type
  )[0].style;


  return (
    <span className={`${typeClassName} ${className}`} {...rest}>
      {children}
    </span>
  );
}
