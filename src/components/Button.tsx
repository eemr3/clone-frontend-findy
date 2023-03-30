import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fill?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  fill = false,
  disabled = false,
  className = "text-[1.4rem] leading-[1.162rem] tracking-[0.091rem] font-bold",
  ...rest
}: ButtonProps) {
  const buttonStyle = fill
    ? `${disabled
      ? "bg-grey-#4 text-grey-#2"
      : "shadow-shadow-button bg-green-medium text-grey-#5 hover:bg-green-dark"
    }`
    : `border-[1px] ${disabled
      ? "text-grey-#2 border-grey-#2"
      : "shadow-shadow-button text-green-medium border-green-medium hover:text-green-dark hover:border-green-dark"
    }`;

  return (
    <button
      className={`h-[3.341rem] w-fit rounded-[2.324rem] px-[1.743rem] uppercase ${className} ${buttonStyle}`}
      {...rest}
    >
      {children}
    </button>
  );
}
