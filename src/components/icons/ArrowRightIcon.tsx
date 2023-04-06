import { SVGAttributes, useState } from "react";

interface ArrowRightIconProps
  extends Partial<
    Omit<SVGAttributes<SVGSVGElement>, "width" | "height" | "fill" | "viewBox">
  > {
  color?: string;
  colorHover?: string;
}

export function ArrowRightIcon({ color = "#252C43", colorHover = "#326BFF", ...rest }: ArrowRightIconProps) {
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
      <path stroke={mouseOver ? colorHover : color} strokeWidth="8" d="M3 3l25 23.5L3 50"></path>
    </svg>
  );
}


