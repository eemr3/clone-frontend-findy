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
      <div
        className="flex h-[241px] w-[540px] items-center justify-center text-[24px] 
      font-medium text-white"
      >
        {props.text}
      </div>
    </div>
  );
}
