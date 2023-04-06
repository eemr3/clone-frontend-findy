import { SVGAttributes, useState } from "react";

interface ArrowLeftIconProps
  extends Partial<
    Omit<SVGAttributes<SVGSVGElement>, "width" | "height" | "fill" | "viewBox">
  > {
  color?: string;
  colorHover?: string;
}

export function ArrowLeftIcon({ color = "#252C43", colorHover = "#326BFF", ...rest }: ArrowLeftIconProps) {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="53"
      fill="none"
      viewBox="0 0 34 53"
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      {...rest}
    >
      <path stroke={mouseOver ? colorHover : color} strokeWidth="8" d="M31 3L6 26.5 31 50"></path>
    </svg>
  );
}


