import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  disabled?: boolean;
}

export function CustomerLink({
  children,
  disabled = false,
  className,
  ...rest
}: LinkProps) {
  return (
    <a
      className={`font-semibold uppercase ${className} ${
        disabled
          ? "pointer-events-none disabled:text-grey-#2"
          : "text-green-medium hover:text-green-dark"
      }`}
      {...rest}
    >
      {children}
    </a>
  );
}
