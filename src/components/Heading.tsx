import { HTMLAttributes, ReactNode } from "react";

type TypeStyle = {
  type: string;
  style: string;
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
<<<<<<< HEAD
  type: 'lg' | 'lg-leading58' | 'md' | 'sm' | 'xs';
}

export function Heading({ children, type, className, ...rest }: HeadingProps) {
  /* const typeClassName = type == "lg" ?
    "text-[6.4rem] leading-[7.25rem] font-bold" :
    type == "md" ?
      "text-[5.6rem] leading-[5.8rem] font-bold" :
      "text-[4.8rem] leading-[5.8rem] font-semibold"; */

  const listTypeStyle: TypeStyle[] = [
    {
      type: 'lg',
      style: 'text-[6.4rem] leading-[7.25rem] font-bold'
    },
    {
      type: 'lg-leading58',
      style: 'text-[6.4rem] leading-[7.25rem] font-bold'
    },
    {
      type: 'md',
      style: 'text-[5.6rem] leading-[5.8rem] font-bold'
    },
    {
      type: 'sm',
      style: 'text-[4.8rem] leading-[5.8rem] font-semibold'
    },
    {
      type: 'xs',
      style: 'text-[3.6rem] leading-[4.219rem] font-normal'
    }
  ]

  const typeClassName = listTypeStyle.filter(typeStyle => typeStyle.type == type)[0].style;
=======
  type: "lg" | "md" | "sm";
}

export function Heading({ children, type, className, ...rest }: HeadingProps) {
  const typeClassName =
    type == "lg"
      ? "text-[6.4rem] leading-[7.25rem] font-bold"
      : type == "md"
      ? "text-[5.6rem] leading-[5.8rem] font-bold"
      : "text-[4.8rem] leading-[5.8rem] font-semibold";
>>>>>>> feature/page-cadastro

  return (
    <h1 className={`${typeClassName} ${className}`} {...rest}>
      {children}
    </h1>
  );
}
