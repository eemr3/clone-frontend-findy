import {
  ChangeEvent,
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
  useCallback,
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
  name: string;
  type: string;
  label?: string;
  maskType?: "PHONE"; 
  icon?: SVGIcon;
  error?: string;
  isWrittenWithDBData?: boolean;
}

export function InputDBRefact(
  {
    label,
    maskType,
    name,
    icon,
    isWrittenWithDBData = false,
    error,
    onChange,
    ...rest
  }: InputDBProps
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePutMaskOnKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (maskType === "PHONE") {
      e.currentTarget.maxLength = 15 //10
      e.currentTarget.value = maskPhone(e.currentTarget.value);
    }
  }, [maskType]);

  async function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (maskType === "PHONE") {
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

  const renderIconIfExists = icon && (
    <div
      className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.3rem] rounded-tl-[0.3rem] bg-blue-dark-#1
    mbl:max-w-[70%] "
    >
      <>{icon}</>
    </div>
  )

  const inputIsWrittenWithDataStyle = isWrittenWithDBData && 'bg-[#d3d3d3!important]' 
  const maxLengthOfMask = maskType && getMaxLength(maskType)

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
          ref={inputRef}
          maxLength={maxLengthOfMask}
          className={`ml-[2rem] w-[32.2rem] border-none text-[2.4rem] font-medium leading-[2.831rem] tracking-[-0.5%] text-grey-#1 outline-none placeholder:text-grey-#2 disabled:bg-white md:w-[80%] sm:w-[70%] mbl:max-w-[17rem] mbl:text-[1.2rem] ${inputIsWrittenWithDataStyle}`}
          onKeyUp={maskType && handlePutMaskOnKeyUp}
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


