import React from "react";

type SVGProps = {
  className?: string;
  stroke?: string;
};

const IconLock: React.FC<SVGProps> = ({ className, stroke }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    fill="transparent"
    viewBox="0 0 19 19"
  >
    <circle
      cx="9.427"
      cy="9.424"
      r="7.068"
      stroke={stroke}
      strokeWidth="2.42"
    ></circle>
    <path
      stroke={stroke}
      strokeWidth="2.42"
      d="M6.28 9.424l2.356 2.356 3.927-4.712"
    ></path>
  </svg>
);

export default IconLock;
