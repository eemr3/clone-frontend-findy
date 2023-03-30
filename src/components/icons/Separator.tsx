interface SeparatorProps {
  color?: string;
}

export function Separator({ color = "#D9D9D9" }: SeparatorProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="40"
      fill="none"
      viewBox="0 0 3 40"
    >
      <path fill={color} d="M0.625 0.709H2.625V39.709H0.625z"></path>
    </svg>
  );
}
