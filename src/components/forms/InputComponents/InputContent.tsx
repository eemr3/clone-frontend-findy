import {
  DetailedHTMLProps,
  ElementType,
  FormEvent,
  InputHTMLAttributes,
  useCallback,
  useRef,
} from "react";
import { getMaxLength, maskPhone } from "../../../utils/inputdbMasksUtil";
import { tv,type VariantProps } from 'tailwind-variants';
import { isDate } from "../../../utils/DateUtil";
import { formatDateBR } from "../../../utils/FormatUtil";
import { isNumeric } from "../../../utils/StringUtil";



const inputVariantsStyles = tv({
  base: 'flex gap-[1rem] items-center w-[100%] h-[4.7rem] border border-grey-#2 md:p-[1rem] sm:p-[0.1rem] pl-[2.06rem]  font-medium  placeholder:text-grey-#2  text-[1.7rem] md:text-[1.5rem] sm:text-[1rem]  mbl:text-[1.2rem] leading-snug tracking-wide',
  variants: {
    disabled: {
      true: 'bg-grey-#3',
    },
    readOnly: {
      true: 'bg-grey-#2 text-white',
    },
    inputStyle: {
      primary: 'rounded-r-[0.5rem]',
      secondary: 'rounded-[0.8rem] md:p-[0.5rem]',
    },
    isFilled: {
      true:'bg-grey-#3' 
    },
    hasError: {
      true:  'border-red',
      false: 'border-green-medium'
    },
  },
  defaultVariants: {
    inputStyle: "secondary",
    disabled: false,
    readOnly: false,
    isFilled: false,
  }
});


interface InputDBProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  type: string;
  iconInput?: ElementType;
  maskType?: "PHONE"; 
}

export function InputContent(
  {
    maskType,
    name,
    type,
    onBlur,
    children,
    onFocus,
    inputStyle,
    isFilled,
    disabled,
    iconInput: IconElement,
    readOnly,
    hasError,
    className,
    ...rest
  }: InputDBProps & VariantProps<typeof inputVariantsStyles> 
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maxLengthOfMask = maskType && getMaxLength(maskType);

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

  return (
    <div className={inputVariantsStyles({ hasError,inputStyle,disabled,isFilled,className,readOnly })}>
      <input
          ref={inputRef}
          maxLength={maxLengthOfMask}
          onKeyUp={maskType && handlePutMaskOnKeyUp}
          {...rest}
          readOnly={readOnly}
          className='w-full'
          disabled={disabled}
          onBlur={(event) => {
            onBlur ? onBlur(event) : formatDateToBR()
          }}
          onFocus={(event) => {
            onFocus ? onFocus(event) : formatDateToUSA()
          }}
      />
      { IconElement && (<IconElement className='mbl:max-w-[2rem] w-[2rem] h-[2rem] stroke-blue-dark-#1 mr-7'/>) }
  </div>
  );
};


