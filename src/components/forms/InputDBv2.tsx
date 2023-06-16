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

interface InputDBv2Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: string;
  label?: string;
  requiredField?: boolean;
  type?: string;
  placeholder?: string;
  mask?: "PHONE";
  icon?: SVGIcon;
  error?: string;
  fieldSetClassName?: string;
  fieldSetBG?: string;
  wantInputWidthFull?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBv2Props> = (
  {
    name = "",
    label,
    requiredField = false,
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
      className={`h-[7.6rem] flex flex-col ${fieldSetClassName}`}
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
    >
      {!!label && (
        <label
          htmlFor={name}
          className="mb-[0.3rem] text-[1.6rem] font-medium leading-[2.08rem] tracking-[-0.5%] text-black text-opacity-80"
        >
          {`${label}${requiredField ? "*" : ""}`}
        </label>
      )}

      <div
        className={`flex h-[3.6rem] w-[50.5rem] py-[0.8rem] px-[1.6rem] rounded-[0.8rem] border-[0.1rem] border-grey-#2 bg-grey-#4 ${fieldSetBG} ${wantInputWidthFull ? "w-full" : ""}`}
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
          className={`w-full border-none text-[1.4rem] font-medium leading-[1.82rem] bg-grey-#4 text-green-medium outline-none placeholder:text-grey-#2 disabled:bg-grey-#3  ${className} ${fieldSetBG} ${wantInputWidthFull ? "w-[96%]" : ""}`}
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
          type="sm"
          className="text-red"
        >
          {`${error}`}
        </Text>
      )}
    </fieldset>
  );
};

export const InputDBv2 = forwardRef(InputBase);
