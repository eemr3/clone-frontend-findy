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
  isWrittenWithData?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBProps> = (
  {
    name = "",
    label,
    placeholder,
    mask,
    icon = undefined,
    isWrittenWithData = false,
    type = "text",
    error = null,
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

  const renderLabelIfExists = !!label && (
    <label
      htmlFor={name}
      className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1  mbl:text-[1.5rem] mbl:font-bold"
    >
      {label}
    </label>
  )

  const renderIconIfExists =  icon && (
    <div
      className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.3rem] rounded-tl-[0.3rem] bg-blue-dark-#1
    mbl:max-w-[70%] "
    >
      <>{icon}</>
    </div>
  )

  const inputIsWrittenWithDataStyle = isWrittenWithData && 'bg-[#d3d3d3!important]' 


  const renderErrorIfExist = !!error && (
    <Text
      type="md"
      className="text-[1.8rem] font-bold leading-[1.924rem] text-red"
    >
      {`${error}`}
    </Text>
  )

  return (
    <fieldset
      className={`flex flex-col gap-[1.2rem] lg:ml-[0] sm:max-w-[100%]`}
      onClick={() => {
         inputRef.current?.focus();
      }}
    >
       { renderLabelIfExists }

      <div
        className={`flex h-[6.631rem] w-[100%] rounded-[0.3rem]  border-[0.1rem] border-grey-#1 bg-white  sm:h-[5.6rem] sm:w-[32rem] sm:max-w-[100%] mbl:h-[4rem] mbl:max-h-[3rem] mbl:max-w-[80%] ${inputIsWrittenWithDataStyle} }`}
      >
        { renderIconIfExists }

        <input
          name={name}
          ref={inputRef}
          type={type}
          maxLength={mask && getMaxLength(mask)}
          placeholder={placeholder}
          className={`ml-[2rem] w-[32.2rem] border-none text-[2.4rem] font-medium leading-[2.831rem] tracking-[-0.5%] text-grey-#1 outline-none placeholder:text-grey-#2 disabled:bg-white md:w-[80%] sm:w-[70%] mbl:max-w-[17rem] mbl:text-[1.2rem] ${className} ${inputIsWrittenWithDataStyle}`}
          onKeyUp={mask && handleKeyUp}
          onChange={(event) => {
            handleOnChange(event);

            onChange &&
              onChange(event);
          }}
          {...rest}
        />
      </div>

     { renderErrorIfExist }
    </fieldset>
  );
};

export const InputDBRefact = forwardRef(InputBase);
