import { ReactNode } from "react";
import { LogoLarge } from "./LogoLarge";

interface FrameWithLogoLargeProps {
  children: ReactNode;
  frameHeight?: string;
  sectionClassName?: string;
}

export function FrameWithLogoLarge({
  children,
  frameHeight = "h-[87rem]",
  sectionClassName = "",
}: FrameWithLogoLargeProps) {
  return (
    /* <div className={`bg-blue-dark h-[${frameHeight}]`}> */
    <div className={`bg-blue-dark ${frameHeight}`}>
      <LogoLarge className="absolute mt-[1.533rem]  ml-[2.891rem]" />

      <section className={`relative z-10 ${sectionClassName}`}>
        {children}
      </section>
    </div>
  );
}
