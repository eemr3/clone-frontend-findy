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
  wantInputWidthFull?: boolean;
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
    wantInputWidthFull = false,
    className = "",

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
      className={`flex w-fit max-w-[10rem] flex-col gap-[1.2rem]  sm:max-w-[100%] ${fieldSetClassName}`}
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
    >
      {!!label && (
        <label
          htmlFor={name}
          className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1 mbl:text-[2rem] mbl:font-bold"
        >
          {label}
        </label>
      )}

      <div
        className={`flex h-[6.631rem] w-[42.5rem] rounded-[0.8rem]  border-[0.1rem] border-grey-#1 bg-white  sm:h-[5.6rem] sm:w-[32rem] sm:max-w-[100%] mbl:h-[4rem] mbl:max-w-[100%] ${
          wantInputWidthFull ? "w-full" : ""
        }`}
      >
        {icon && (
          <div className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.6rem] rounded-tl-[0.6rem] bg-blue-dark-#1">
            <>{icon}</>
          </div>
        )}
        <input
          name={name}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={`ml-[2rem] w-[32.2rem]   border-none text-[2.4rem] font-medium leading-[2.831rem] tracking-[-0.5%] text-grey-#1 outline-none placeholder:text-grey-#2 md:w-[80%] sm:w-[70%] ${className} ${
            wantInputWidthFull ? "w-[96%]" : ""
          }`}
          {...rest}
        />
      </div>

      {!!error && (
        <Text
          type="md"
          className="text-[1.8rem] font-bold leading-[1.924rem] text-red"
        >
          {`${error}`}
        </Text>
      )}
    </fieldset>
  );
};

export const InputDB = forwardRef(InputBase);
