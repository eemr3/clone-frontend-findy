import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  type?: "menu" | "card";
  disabled?: boolean;
}

export function Link({
  children,
  type = "menu",
  disabled = false,
  className,
  ...rest
}: LinkProps) {
  const typeClassName =
    type == "menu" ? "font-semibold uppercase" : "font-medium flex ";

  return (
    <a
      className={`${typeClassName} ${className} ${
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
