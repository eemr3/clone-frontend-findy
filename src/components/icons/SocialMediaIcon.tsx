import { SVGIconProps } from "../../types/SVGIcon";

export function SocialMediaIcon({ color = "#fff", ...rest }: SVGIconProps) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="40"
      fill="none"
      viewBox="0 0 26 40"
      {...rest}
    >
      <ellipse
        cx="13.004"
        cy="20"
        stroke="#fff"
        strokeWidth="2.617"  //  mbl:max-w-[2rem] mbl:max-h-[2rem]"
        rx="10.98"
        ry="10.588"
      ></ellipse>
      <path
        stroke="#fff"
        strokeWidth="2.617"
        d="M22.024 12.315c-.993 1.023-2.313 1.861-3.85 2.447-1.536.586-3.246.903-4.988.923a14.74 14.74 0 01-5.029-.804c-1.563-.55-2.92-1.356-3.961-2.354M22.024 27.685c-.993-1.023-2.313-1.861-3.85-2.447-1.536-.586-3.246-.903-4.988-.923a14.74 14.74 0 00-5.029.804c-1.563.55-2.92 1.356-3.961 2.354M13 9.412v21.176M23.984 19.608H2.024"
      ></path>
    </svg>
  );

}
