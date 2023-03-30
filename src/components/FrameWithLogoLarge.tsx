import { ReactNode } from "react";
import { LogoLarge } from "./LogoLarge";

interface FrameWithLogoLargeProps {
  children: ReactNode;
  frameHeight?: string;
  sectionClassName?: string;
}

export function FrameWithLogoLarge({
  children,
  frameHeight = "87rem",
  sectionClassName = "",
}: FrameWithLogoLargeProps) {
  return (
    <article className={`bg-blue-dark`} style={{ height: frameHeight }}>
      <LogoLarge className="absolute mt-[1.533rem]  ml-[2.891rem]" />

      <section className={`relative z-10 ${sectionClassName}`}>
        {children}
      </section>
    </article>
  );
}
