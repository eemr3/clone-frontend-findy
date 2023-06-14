import React from 'react';

interface BenefitsProps {
  text?: string;
  reverse?: boolean;
}

export function Benefit(props: BenefitsProps) {
  return (
    <div
      className={`flex w-full items-center justify-around gap-6
      ${props.reverse ? 'flex-row-reverse' : 'sm:flex-row'}`}
    >
      <div className="h-[306px] w-[543px] bg-[#E5E5E5]"></div>
      <div className="items-centerh-[241px] flex w-[540px] justify-center text-2xl font-medium text-black">
        {props.text}
      </div>
    </div>
  );
}
