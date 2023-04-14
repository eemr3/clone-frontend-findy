import { X } from "@phosphor-icons/react";

interface TagProps {
  label: string;
  tagColor: "blue" | "green" | "pink" | "purple" | "red" | "yellow";
  closeButtonEnabled?: boolean;
}

export function Tag({ label, tagColor, closeButtonEnabled = false }: TagProps) {
  const listTagColor = [
    "bg-tag-blue",
    "bg-tag-green",
    "bg-tag-pink",
    "bg-tag-purple",
    "bg-tag-red",
    "bg-tag-yellow",
  ];

  return (
    <div
      className={`shadow-shadow-tag flex items-center gap-[0.711rem] bg-[#01A195] rounded-[2.844rem] px-[1.422rem] py-[0.355rem] ${
        listTagColor[listTagColor.indexOf(``)]
      }`}
    >
      <span className="text-[1.5rem] font-medium uppercase leading-[2.499rem] tracking-[-0.005rem] text-white">
        {label}
      </span>
      {closeButtonEnabled && (
        <X size={21} weight="bold" className="text-grey-#1" />
      )}
    </div>
  );
}
