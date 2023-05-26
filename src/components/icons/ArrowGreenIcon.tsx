import { SVGIconProps } from "../../types/SVGIcon";

export function ArrowGreenIcon({ color = "#01A195", ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32" 
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...rest}
    >
      <path
        d="M16 24L8 16L16 8" 
        stroke={color} 
        stroke-width="2.54987"
      >
      </path>
      <path
        d="M24 24L16 16L24 8" 
        stroke={color} 
        stroke-width="2.54987"
      >
      </path>
    </svg>
  );
}
