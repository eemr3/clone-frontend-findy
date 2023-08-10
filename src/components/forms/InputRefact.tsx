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


  const renderLabelIfExists = !!label && (
    <label
      htmlFor={name}
      className='text-[2.4rem] font-medium text-grey-#1 leading-snug tracking-normal mbl:text-[1.5rem] sd:text-[1rem] md:text-[1.1rem] mbl:font-bold'
    >
      {label}
    </label>
  )

  const renderIconIfExists = icon && (
    <div
      className='flex items-center justify-center bg-blue-dark-#1 px-5 rounded-l-[0.5rem]'
    >
      <>{icon}</>
    </div>
  )

  const inputIsWrittenWithDataStyle = isWrittenWithDBData && 'bg-[#d3d3d3!important]' 
  const maxLengthOfMask = maskType && getMaxLength(maskType)

  const renderErrorIfExist = !!error && (
    <Text
      type="md"
      className='text-red text-[1.5rem] md:text-[1rem] font-medium leading-snug tracking-normal mbl:font-bold'
    >
      {`${error}`}
    </Text>
  )

  return (
    <fieldset
      className={'flex flex-col gap-y-[1.2rem] md:gap-y-[0.5rem] sm:gap-y-[0.2rem] w-[100%]'}
      onClick={() => {
         inputRef.current?.focus();
      }}
    >
       { renderLabelIfExists }

      <div
        className={`flex w-[100%] bg-white ${inputIsWrittenWithDataStyle}`}
      >
        { renderIconIfExists }

        <input
          ref={inputRef}
          maxLength={maxLengthOfMask}
          className={`border-[1px] border-black md:p-[1rem] rounded-r-[0.5rem] p-[1.25rem] sm:p-[0.1rem] text-[2.4rem] md:text-[1.5rem] sm:text-[1rem]  mbl:text-[1.2rem] font-medium leading-snug tracking-wide w-[100%]  ${inputIsWrittenWithDataStyle}`}
          onKeyUp={maskType && handlePutMaskOnKeyUp}
          {...rest}
        />
      </div>

     { renderErrorIfExist }
    </fieldset>
  );
};


