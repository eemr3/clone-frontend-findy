import { HTMLAttributes, ReactNode } from "react";
import { TypeStyle } from "../types/TypeStyle";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  type: "lg" | "lg-leading58" | "md" | "sm" | "xs" | "xxs" | "xl";
}

export function Heading({ children, type, className, ...rest }: HeadingProps) {
  /* const typeClassName = type == "lg" ?
    "text-[6.4rem] leading-[7.25rem] font-bold" :
    type == "md" ?
      "text-[5.6rem] leading-[5.8rem] font-bold" :
      "text-[4.8rem] leading-[5.8rem] font-semibold"; */

  const listTypeStyle: TypeStyle[] = [
    {
      type: "lg",
      style: "text-[6.4rem] leading-[7.25rem] font-bold",
    },
    {
      type: "lg-leading58",
      style: "text-[6.4rem] leading-[7.25rem] font-bold",
    },
    {
      type: "md",
      style: "text-[5.6rem] leading-[5.8rem] font-bold",
    },
    {
      type: "sm",
      style: "text-[4.8rem] leading-[5.8rem] font-semibold",
    },
    {
      type: "xs",
      style: "text-[3.6rem] leading-[4.219rem] font-normal",
    },
  
    {
      type: "xxs",
      style: "text-[2.4rem] leading-[3.12rem] font-medium",
    },

    {
      type: "xl",
      style: "text-[1.6rem] leading-[2.08rem] font-medium",
    },
  ];

  const typeClassName = listTypeStyle.filter(
    (typeStyle) => typeStyle.type == type
  )[0].style;

  return (
    <h1 className={`${typeClassName} ${className}`} {...rest}>
      {children}
    </h1>
  );
}
