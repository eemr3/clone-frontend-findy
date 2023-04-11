interface SpinnerProps {
  color?: string;
  type?: "default" | "half" | "closer" | "far" | "center";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const listSpinnerType = [
  {
    type: "default",
    radius: "10"
  },
  {
    type: "half",
    radius: "8"
  },
  {
    type: "closer",
    radius: "6"
  },
  {
    type: "far",
    radius: "4"
  },
  {
    type: "center",
    radius: "2"
  }
];

const listSpinnerSize = ["xs", "sm", "md", "lg", "xl"]; // [1, 2, 4, 8, 16];

export function Spinner({ color = "rgb(37 44 67)", type = "default", size = "md" }: SpinnerProps) {
  const radius = listSpinnerType.filter(spinnerType => spinnerType.type == type)[0].radius;

  const spinnerSize = Math.pow(2, listSpinnerSize.indexOf(size))

  return (
    <svg width={`${spinnerSize}rem`} height={`${spinnerSize}rem`} className="animate-spin mr-3  text-blue-dark " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r={radius} stroke={color} strokeWidth="4"></circle>
      <path className="opacity-75" fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

}