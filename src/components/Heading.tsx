import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  type: "lg" | "md" | "sm";
}

export function Heading({ children, type, className, ...rest }: HeadingProps) {
  const typeClassName =
    type == "lg"
      ? "text-[6.4rem] leading-[7.25rem] font-bold"
      : type == "md"
      ? "text-[5.6rem] leading-[5.8rem] font-bold"
      : "text-[4.8rem] leading-[5.8rem] font-semibold";

  return (
    <h1 className={`${typeClassName} ${className}`} {...rest}>
      {children}
    </h1>
  );
}
