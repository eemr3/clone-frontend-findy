import { SVGIconProps } from "../../types/SVGIcon";

export function CheckIcon({ color = "#01A195", ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35" 
      height="35" 
      viewBox="0 0 35 35" 
      fill="none" 
      {...rest}
    >
      <path
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M17.2551 30.1992C24.4031 30.1992 30.1977 24.4046 30.1977 17.2566C30.1977 10.1086 24.4031 4.31396 17.2551 4.31396C10.1071 4.31396 4.3125 10.1086 4.3125 17.2566C4.3125 24.4046 10.1071 30.1992 17.2551 30.1992ZM16.8533 22.4337L24.0436 13.8053L21.9724 12.0792L15.7271 19.5736L12.4567 16.3032L10.5502 18.2097L14.8644 22.5239L15.9083 23.5677L16.8533 22.4337Z" 
        fill={color}
      >
      </path>
    </svg>
  );
}
