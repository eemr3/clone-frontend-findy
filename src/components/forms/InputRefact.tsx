import {
  DetailedHTMLProps,
  ElementType,
  FormEvent,
  InputHTMLAttributes,
  useCallback,
  useRef,
} from "react";
import { Text } from "../Text";
import { getMaxLength, maskPhone } from "../../utils/inputdbMasksUtil";
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';
import { isDate } from "../../utils/DateUtil";
import { formatDateBR } from "../../utils/FormatUtil";
import { isNumeric } from "../../utils/StringUtil";

interface InputDBProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  type: string;
  label?: string;
  maskType?: "PHONE"; 
  icon?: ElementType;
  error?: string;
}

const inputVariantsStyles = tv({
  slots: {
    inputStylesBase: 'border-[1px] border-black  md:p-[1rem] sm:p-[0.1rem] font-medium  w-[100%] placeholder:text-grey-#2',
    iconStylesBase: 'flex items-center justify-center', 
    labelStylesBase: 'font-medium mbl:font-bold',
  },
  variants:{
    inputStyle: {
      primary: {
        inputStylesBase:'rounded-r-[0.5rem]  p-[1.25rem] text-[2.4rem] md:text-[1.5rem] sm:text-[1rem]  mbl:text-[1.2rem] leading-snug tracking-wide',
        iconStylesBase: 'px-5 bg-blue-dark-#1 px-5 rounded-l-[0.5rem]',
        labelStylesBase: "text-[2.4rem] md:text-[1.1rem] tracking-normal",
       },
      secondary: { 
        inputStylesBase:'rounded-[0.8rem] p-[0.8rem] md:p-[0.5rem] text-[1.4rem] text-green-medium leading-[1.82rem]',
        iconStylesBase: 'w-0',
        labelStylesBase: 'text-[1.6rem] md:text-[0.8rem] text-black',
      }
    },
    disabled: {
      true: {
        inputStylesBase: 'bg-[#d3d3d3]',
      },
    },
    readOnly: {
      true: {
        inputStylesBase: 'text-grey-#2',
      },
    },
    isFilled: {
      true: { 
        inputStylesBase: 'bg-[#d3d3d3]' 
      },
    }
  },
  defaultVariants:{
    inputStyle: "secondary",
    filled: false
  }
});


export function InputDBRefact(
  {
    label,
    maskType,
    name,
    type,
    icon: Icon,
    error,
    onBlur,
    onFocus,
    inputStyle,
    isFilled,
    disabled,
    readOnly,
    className,
    ...rest
  }: InputDBProps & VariantProps<typeof inputVariantsStyles> 
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maxLengthOfMask = maskType && getMaxLength(maskType);
  
  const { 
    inputStylesBase,
    iconStylesBase,
    labelStylesBase 
  } = inputVariantsStyles({ inputStyle, className, isFilled, disabled, readOnly })

  const handlePutMaskOnKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (maskType === "PHONE") {
      e.currentTarget.maxLength = 15;
      e.currentTarget.value = maskPhone(e.currentTarget.value);
    }
  }, [maskType]);

  function formatDateToBR() {
    if (type == "date" && inputRef.current) {
      inputRef.current.type = 'text';
      if (isDate(inputRef.current.value)) {
        const brDate = formatDateBR(new Date(inputRef.current.value));
        inputRef.current.value = brDate;
      }
    }
  }

  function formatDateToUSA(){
    if (type == "date" && inputRef.current) {

      const phoneNumberRegex = /(\d{2})\/(\d{2})\/(\d{4})/;

      if (isNumeric(inputRef.current.value.replaceAll("/", ""))) {
        const usDate = inputRef.current.value.replace(phoneNumberRegex, "$3-$2-$1");
        inputRef.current.value = usDate;
      }

      inputRef.current.type = type;
    }
  }


  const renderLabelIfExists = !!label && (
    <label
      htmlFor={name}
      className={labelStylesBase()} 
    >
      {label}
    </label>
  )

  const renderIconIfExists = Icon && (
    <div
      className={iconStylesBase()}
    >
      {<Icon className={'mbl:max-w-[2rem]'} />}
    </div>
  )

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
        className={`flex w-[100%]`}
      >
        { renderIconIfExists }

        <input
          ref={inputRef}
          maxLength={maxLengthOfMask}
          className={inputStylesBase()}
          onKeyUp={maskType && handlePutMaskOnKeyUp}
          {...rest}
          readOnly
          onBlur={(event) => {
            onBlur ? onBlur(event) : formatDateToBR()
          }}
          onFocus={(event) => {
            onFocus ? onFocus(event) : formatDateToUSA()
          }}
        />
      </div>

     { renderErrorIfExist }
    </fieldset>
  );
};


