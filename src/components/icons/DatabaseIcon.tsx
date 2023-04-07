import { SVGIconProps } from "../../types/SVGIcon";

export function DatabaseIcon({ color = "#F9F9F9", ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="94"
      height="95"
      fill="none"
      viewBox="0 0 94 95"
      {...rest}
    >
      <path
        fill={color}
        d="M47 94.595c-13.143 0-24.262-2.023-33.357-6.07C4.548 84.476 0 79.537 0 73.705V21.484C0 15.74 4.591 10.822 13.774 6.731 22.956 2.641 34.032.595 47 .595s24.044 2.046 33.226 6.136C89.41 10.822 94 15.74 94 21.484v52.222c0 5.832-4.548 10.771-13.643 14.818-9.095 4.048-20.214 6.071-33.357 6.071zm0-63.71c7.485 0 15.166-1.154 23.043-3.46 7.877-2.307 12.947-4.896 15.21-7.769-2.35-2.785-7.464-5.352-15.34-7.702C62.035 9.604 54.397 8.428 47 8.428c-7.66 0-15.362 1.131-23.108 3.394-7.747 2.263-12.838 4.874-15.275 7.833 2.437 3.047 7.485 5.68 15.144 7.899 7.66 2.22 15.406 3.33 23.239 3.33zm-.13 27.938c3.655 0 7.31-.196 10.966-.587a86.758 86.758 0 0010.51-1.763 79.51 79.51 0 009.596-2.872c3.046-1.132 5.788-2.394 8.225-3.786V29.579c-2.524 1.392-5.31 2.654-8.356 3.786a78.303 78.303 0 01-9.661 2.872 100.56 100.56 0 01-10.444 1.828c-3.569.435-7.181.652-10.837.652-3.655 0-7.31-.217-10.966-.652a96.037 96.037 0 01-10.51-1.828 76.215 76.215 0 01-9.53-2.872c-3.003-1.132-5.68-2.394-8.03-3.787v20.237c2.35 1.392 5.005 2.654 7.964 3.786 2.96 1.131 6.115 2.089 9.465 2.872 3.351.783 6.855 1.37 10.51 1.763 3.656.391 7.355.587 11.097.587zM47 86.762c4.178 0 8.486-.37 12.925-1.11 4.439-.74 8.508-1.719 12.207-2.937 3.699-1.219 6.832-2.568 9.4-4.048 2.568-1.48 4.112-3.002 4.635-4.569v-16.32c-2.437 1.393-5.179 2.633-8.225 3.721a88.223 88.223 0 01-9.596 2.807A87.079 87.079 0 0157.9 66.07c-3.612.391-7.289.587-11.032.587-3.742 0-7.441-.196-11.097-.587a86.722 86.722 0 01-10.51-1.763c-3.35-.783-6.506-1.719-9.465-2.807-2.959-1.088-5.614-2.328-7.964-3.72v16.45c.436 1.48 1.915 2.98 4.44 4.504 2.523 1.523 5.657 2.872 9.4 4.047 3.742 1.175 7.833 2.132 12.271 2.872 4.44.74 8.791 1.11 13.056 1.11z"
      ></path>
    </svg>
  );
}


