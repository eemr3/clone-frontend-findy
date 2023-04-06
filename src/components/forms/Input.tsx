import Icon from "@phosphor-icons/react";
import { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  placeholder: string;
  icon?: Icon.IconProps | undefined;
}

export function Input({ placeholder, icon = undefined, className, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <fieldset
      className="flex gap-[1.6rem] items-center"
      onClick={() => {
        if (inputRef.current)
          inputRef.current.focus()
      }}
    >

      {icon &&
        <>
          {icon}
        </>
      }
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className={`${className} text-[2.4rem] leading-[3.2rem] font-medium text-black placeholder:text-grey-#2 border-none outline-none`}
        {...rest}
      />
    </fieldset>
  );
}