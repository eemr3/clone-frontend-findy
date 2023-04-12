import { SVGIconProps } from "../../types/SVGIcon";

export function TelephoneIcon({ color = "#fff", ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      fill="none"
      viewBox="0 0 23 23"
      {...rest}
    >
      <path
        fill={color}
        d="M2.815 1.764l.839-.839a1.309 1.309 0 011.85 0l3.413 3.413c.51.51.51 1.34 0 1.85L6.553 8.552c-.393.393-.49.994-.242 1.492a14.86 14.86 0 006.646 6.645 1.292 1.292 0 001.491-.242l2.363-2.364a1.309 1.309 0 011.851 0l3.413 3.413c.51.51.51 1.34 0 1.85l-.839.839a7.851 7.851 0 01-10.263.73l-1.639-1.23a30.097 30.097 0 01-6.019-6.02l-1.23-1.638a7.851 7.851 0 01.73-10.263z"
      ></path>
    </svg>
  );
}
