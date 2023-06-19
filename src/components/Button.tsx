import { ButtonHTMLAttributes, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fill?: boolean;
  disabled?: boolean;
  url?: string | (() => string | undefined);
}

export function Button({
  children,
  fill = false,
  disabled = false,
  url = undefined,
  className = "text-[1.4rem] leading-[1.162rem] tracking-[0.091rem] font-bold",
  type = 'button',
  onClick,
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

  /* const navigate = useNavigate(); */

  const navigate = useNavigate();

  return (
    <button
      className={`h-[3.341rem] w-fit rounded-[2.324rem] px-[1.743rem] uppercase disabled:cursor-not-allowed ${className} ${buttonStyle}`}
      disabled={disabled}
      onClick={(event) => {
        /* url &&
          navigate(url); */

        if (typeof url === "string") {
          navigate(url);
        } else if (typeof url === "function") {
          const urlResult = url.call(null);
          if (typeof urlResult === "string") {
            navigate(urlResult);
          }
        }

        onClick && onClick(event);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
