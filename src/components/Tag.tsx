import { X } from "@phosphor-icons/react";

interface TagProps {
  label: string;
  tagColor: 'blue' | 'green' | 'pink' | 'purple' | 'red' | 'yellow';
  closeButtonEnabled?: boolean;
}

export function Tag({ label, tagColor, closeButtonEnabled = false }: TagProps) {
  const listTagColor = [
    'bg-tag-blue', 'bg-tag-green', 'bg-tag-pink',
    'bg-tag-purple', 'bg-tag-red', 'bg-tag-yellow'
  ];

  return (
    <div className={`px-[1.422rem] py-[0.355rem] rounded-[2.844rem] flex gap-[0.711rem] items-center shadow-shadow-tag ${listTagColor[listTagColor.indexOf(`bg-tag-${tagColor}`)]}`}>
      <span className="text-[2.133rem] leading-[2.499rem] tracking-[-0.005rem] font-medium text-grey-#1 uppercase">
        {label}
      </span>
      {closeButtonEnabled &&
        <X size={21} weight="bold" className="text-grey-#1" />
      }
    </div>
  );
}