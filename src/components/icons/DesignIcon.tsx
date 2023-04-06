import { SVGAttributes } from "react";

interface DesignIconProps
  extends Partial<
    Omit<SVGAttributes<SVGSVGElement>, "width" | "height" | "fill" | "viewBox">
  > {
  color?: string;
}

export function DesignIcon({ color = "#F9F9F9", ...rest }: DesignIconProps) {
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
        d="M79.809 33.629l-18.8-18.824 8.49-8.502c1.375-1.376 3.073-2.064 5.095-2.064 2.021 0 3.72.688 5.094 2.064l8.611 8.623c1.375 1.376 2.062 3.077 2.062 5.1 0 2.025-.687 3.725-2.062 5.102l-8.49 8.5zM3.275 91.438V72.492l23.53-23.56L0 21.97 21.105.595l27.047 27.083L61.01 14.805l18.8 18.824-12.857 12.873L94 73.585l-21.226 21.01-26.926-26.84-23.652 23.683H3.275zm28.746-47.73l10.916-10.93-8.854-8.865-5.822 5.83-5.095-5.101 5.822-5.83-7.762-7.772L10.31 21.97l21.71 21.739zm40.51 40.686l10.917-10.93-7.763-7.773-5.822 5.83-5.094-5.102 5.822-5.829-8.854-8.866-10.916 10.93 21.71 21.74zm-61.979-.243h8.49l50.336-50.4-8.49-8.502-50.336 50.4v8.502z"
      ></path>
    </svg>
  );
}