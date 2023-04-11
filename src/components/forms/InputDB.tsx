import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { SVGIcon } from "../../types/SVGIcon";
import { Text } from "../Text";

interface InputDBProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: SVGIcon;
  error?: string;
  fieldSetClassName?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBProps> = (
  {
    name = "",
    label,
    placeholder,
    icon = undefined,
    type = "text",
    error = null,
    fieldSetClassName = "",
    className,
    ...rest
  },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  );

  return (
    <fieldset
      className={`flex w-fit flex-col gap-[1.2rem] ${fieldSetClassName}`}
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
    >
      {!!label && (
        <label
          htmlFor={name}
          className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1"
        >
          {label}
        </label>
      )}

      <div className="flex h-[6.631rem] w-[42.5rem] rounded-[0.8rem] border-[0.1rem] border-grey-#1 bg-white">
        {icon && (
          <div className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.6rem] rounded-tl-[0.6rem] bg-blue-dark-#1">
            <>{icon}</>
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={`${className} ml-[2rem] w-[33.2rem] border-none text-[2.4rem] font-medium leading-[2.831rem] tracking-[-0.5%] text-grey-#1 outline-none placeholder:text-grey-#2`}
          {...rest}
        />
      </div>

      {!!error && (
        <Text type="sm" className="font-semibold leading-[1.924rem] text-red">
          {`Erro (${error})`}
        </Text>
      )}
    </fieldset>
  );
};

export const InputDB = forwardRef(InputBase);

/* export function InputDB({ placeholder, icon = undefined, className, ...rest }: InputDBProps) {
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
} */
