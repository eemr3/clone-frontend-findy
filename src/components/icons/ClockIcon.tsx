import { SVGIconProps } from "../../types/SVGIcon";

export function ClockIcon({ color = "#fff", ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
      {...rest}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M14.198 27.643c7.371 0 13.346-5.99 13.346-13.378C27.544 6.876 21.57.887 14.198.887S.852 6.877.852 14.265c0 7.389 5.975 13.378 13.346 13.378zM15.507 6.09a1.309 1.309 0 10-2.617 0v7.848c0 .904.732 1.636 1.635 1.636h4.863a1.309 1.309 0 000-2.617h-3.881V6.09z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
