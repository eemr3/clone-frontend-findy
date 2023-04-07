import { SVGAttributes } from "react";

export type SVGIcon = JSX.IntrinsicElements["svg"];

export interface SVGIconProps
  extends Partial<
    Omit<SVGAttributes<SVGSVGElement>, "width" | "height" | "fill" | "viewBox">
  > {
  color?: string;
}