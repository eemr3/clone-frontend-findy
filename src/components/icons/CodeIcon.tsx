import { SVGIconProps } from "../../types/SVGIcon";

export function CodeIcon({ color = "#F9F9F9", ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="116"
      height="79"
      fill="none"
      viewBox="0 0 116 79"
      {...rest}
    >
      <path
        fill={color}
        d="M34.8 78.674L0 39.5 35.09 0l6.235 7.019L12.47 39.5l28.565 32.155-6.235 7.019zM80.91 79l-6.235-7.019L103.53 39.5 74.965 7.345 81.2.326 116 39.5 80.91 79z"
      ></path>
    </svg>
  );
}


