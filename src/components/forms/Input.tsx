import Icon from "@phosphor-icons/react";
import { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder: string;
  icon?: Icon.IconProps | undefined;
}

export function Input({
  placeholder,
  icon = undefined,
  className,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <fieldset
      className="flex items-center gap-[1.6rem]"
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
    >
      {icon && <>{icon}</>}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className={`${className} border-none text-[2.4rem] font-medium leading-[3.2rem] text-black outline-none placeholder:text-grey-#2 mbl:text-[1.4rem]`}
        {...rest}
      />
    </fieldset>
  );
}
