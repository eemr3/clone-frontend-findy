import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { SVGIcon } from "../../types/SVGIcon";
import { Text } from "../Text";

interface InputDBProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  /* name?: string; */
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: SVGIcon;
  error?: string;
  fieldSetClassName?: string;
  wantInputWidthFull?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBProps>
  = ({
    /* name = '', */
    label,
    placeholder,
    icon = undefined,
    type = 'text',
    error = null,
    fieldSetClassName = '',
    wantInputWidthFull = false,
    className = "",

    ...rest }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current
    );

    return (
      <fieldset
        className={`flex flex-col gap-[1.2rem] ${fieldSetClassName}`}
        /* className={`w-fit flex flex-col gap-[1.2rem] max-w-[10rem] ${fieldSetClassName}`} */
        onClick={() => {
          if (inputRef.current)
            inputRef.current.focus()
        }}
      >

        {!!label &&
          <label htmlFor={rest.name} className={`text-[2.4rem] leading-[2.813rem] tracking-[-0.5%] font-medium text-grey-#1 text-clip overflow-hidden ${wantInputWidthFull ? "w-full" : "max-w-[42.5rem]"}`}>
            {label}
          </label>
        }

        <div className={`w-[42.5rem] h-[6.631rem] rounded-[0.8rem] flex bg-white border-[0.1rem] border-grey-#1 ${wantInputWidthFull ? "w-full" : ""}`}>

          {icon &&
            <div className="w-[5.3rem] rounded-tl-[0.6rem] rounded-bl-[0.6rem] flex items-center justify-center bg-blue-dark-#1">
              <>
                {icon}
              </>
            </div>
          }
          <input
            /* name={name} */
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            className={`w-[33.2rem] text-[2.4rem] leading-[2.831rem] tracking-[-0.5%] ml-[2rem] font-medium text-grey-#1 placeholder:text-grey-#2 disabled:bg-white border-none outline-none ${className} ${wantInputWidthFull ? "w-[96%]" : ""}`}
            {...rest}
          />
        </div>

        {!!error &&
          <Text
            type="md"
            className="text-[1.8rem] text-red font-bold leading-[1.924rem]"
          >
            {`${error}`}
          </Text>
        }
      </fieldset>
    );

  }

export const InputDB = forwardRef(InputBase);