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
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: SVGIcon;
  error?: string;
  fieldSetClassName?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBProps>
  = ({
    name = '',
    label,
    placeholder,
    icon = undefined,
    type = 'text',
    error = null,
    fieldSetClassName = '',
    className = "",
    ...rest }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current
    );

    return (
      <fieldset
        className={`w-fit flex flex-col gap-[1.2rem] ${fieldSetClassName}`}
        onClick={() => {
          if (inputRef.current)
            inputRef.current.focus()
        }}
      >

        {!!label &&
          <label htmlFor={name} className="text-[2.4rem] leading-[2.813rem] tracking-[-0.5%] font-medium text-grey-#1">
            {label}
          </label>
        }

        <div className="w-[42.5rem] h-[6.631rem] rounded-[0.8rem] flex bg-white border-[0.1rem] border-grey-#1">

          {icon &&
            <div className="w-[5.3rem] rounded-tl-[0.6rem] rounded-bl-[0.6rem] flex items-center justify-center bg-blue-dark-#1">
              <>
                {icon}
              </>
            </div>
          }
          <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            className={`${className} w-[33.2rem] text-[2.4rem] leading-[2.831rem] tracking-[-0.5%] ml-[2rem] font-medium text-grey-#1 placeholder:text-grey-#2 border-none outline-none`}
            {...rest}
          />
        </div>

        {!!error &&
          <Text
            type="sm"
            className="text-red font-semibold leading-[1.924rem]"
          >
            {`Erro (${error})`}
          </Text>
        }
      </fieldset>
    );

  }

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