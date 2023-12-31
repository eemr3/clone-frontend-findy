import {
  ChangeEvent,
  DetailedHTMLProps,
  FormEvent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { SVGIcon } from "../../types/SVGIcon";
import { Text } from "../Text";
import { getMaxLength, maskPhone } from "../../utils/inputdbMasksUtil";

interface InputDBProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  mask?: "PHONE"; /* "CEP" | "PHONE" | "PHONE_DDI" | "CPF_CNPJ" | "CPF" | "CNPJ" | "CURRENCY"; */
  icon?: SVGIcon;
  error?: string;
  fieldSetClassName?: string;
  fieldSetBG?: string;
  wantInputWidthFull?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBProps> = (
  {
    name = "",
    label,
    placeholder,
    mask,
    icon = undefined,
    type = "text",
    error = null,
    fieldSetClassName = "",
    fieldSetBG = "",
    wantInputWidthFull = false,
    className = "",
    onChange,
    ...rest
  },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  );

  const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (mask === "PHONE") {
      e.currentTarget.maxLength = 15 //10
      e.currentTarget.value = maskPhone(e.currentTarget.value);
    }
  }, [mask]);

  async function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (mask === "PHONE") {
      e.currentTarget.value = maskPhone(e.currentTarget.value);
    }
  }

  return (
    <fieldset
      className={`flex flex-col gap-[1.2rem] lg:ml-[0] sm:max-w-[100%]  ${fieldSetClassName}`}
      /* className={`flex w-fit flex-col gap-[1.2rem] lg:ml-[0] sm:max-w-[100%] mbl:max-w-[10rem]  ${fieldSetClassName}`} */
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
    >
      {!!label && (
        <label
          htmlFor={name}
          className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1  mbl:text-[1.5rem] mbl:font-bold"
        >
          {label}
        </label>
      )}

      <div
        className={`flex h-[6.631rem] w-[42.5rem] rounded-[0.3rem]  border-[0.1rem] border-grey-#1 bg-white  sm:h-[5.6rem] sm:w-[32rem] sm:max-w-[100%] mbl:h-[4rem] mbl:max-h-[3rem] mbl:max-w-[80%] ${fieldSetBG} ${wantInputWidthFull ? "w-full" : ""
          }`}
      >
        {icon && (
          <div
            className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.3rem] rounded-tl-[0.3rem] bg-blue-dark-#1
          mbl:max-w-[70%] "
          >
            <>{icon}</>
          </div>
        )}
        <input
          name={name}
          ref={inputRef}
          type={type}
          maxLength={mask && getMaxLength(mask)}
          placeholder={placeholder}
          className={`ml-[2rem] w-[32.2rem] border-none text-[2.4rem] font-medium leading-[2.831rem] tracking-[-0.5%] text-grey-#1 outline-none placeholder:text-grey-#2 disabled:bg-white md:w-[80%] sm:w-[70%] mbl:max-w-[17rem] mbl:text-[1.2rem] ${className} ${fieldSetBG} ${wantInputWidthFull ? "w-[96%]" : ""
            }`}
          onKeyUp={mask && handleKeyUp}
          onChange={(event) => {
            handleOnChange(event);

            onChange &&
              onChange(event);
          }}
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
