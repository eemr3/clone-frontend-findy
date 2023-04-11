import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import { SVGIcon } from "../../types/SVGIcon";
import { Text } from "../Text";
import { Spinner } from "../Spinner";

export type ValueLabel = {
  value: string;
  label: string;
}

interface SelectDBProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: ValueLabel[] | string[];
  name?: string;
  label?: string;
  placeholder?: string;
  icon?: SVGIcon;
  error?: string | null;
  fieldSetClassName?: string;
  whenListIsEmpty?: 'Spinner' | 'disabled';
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectDBProps>
  = ({
    options,
    name = '',
    label,
    placeholder,
    icon = undefined,
    error = null,
    whenListIsEmpty = 'Spinner',
    fieldSetClassName = '',
    className = "",
    defaultValue = "",
    ...rest }, ref) => {

    const selectRef = useRef<HTMLSelectElement>(null);
    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => selectRef.current
    );

    const [selectValue, setSelectValue] = useState(
      ref ? "" :
        !!rest.value ? rest.value : defaultValue
    );

    return (

      <fieldset
        className={`w-fit flex flex-col gap-[1.2rem] ${fieldSetClassName}`}
        onClick={() => {
          if (selectRef.current)
            selectRef.current.focus()
        }}
      >
        {!!label &&
          <label
            htmlFor={name}
            className="text-[2.4rem] leading-[2.813rem] tracking-[-0.5%] font-medium text-grey-#1">
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


          {(!options.length &&
            whenListIsEmpty === 'Spinner') ? (

            <div className="w-[33.2rem] flex flex-col items-center justify-center">
              <Spinner />
            </div>
          ) : (

            <select
              name={name}
              id={name}
              disabled={!options.length && whenListIsEmpty === 'disabled'}
              ref={ref}
              className={`${className} w-[33.2rem] text-[2.4rem] leading-[2.831rem] tracking-[-0.5%] ml-[2rem] font-medium bg-white text-grey-#1 placeholder:text-grey-#2 border-none outline-none`}
              value={!ref ? selectValue : rest.value}
              onChange={(e) => setSelectValue(e.currentTarget.value)}
              {...rest}
            >
              {placeholder &&
                <option
                  key="placeholder"
                  value=""
                  disabled
                >
                  {placeholder}
                </option>
              }

              {options &&
                options.sort().map((newOption: string | ValueLabel, index: number) => {
                  return (typeof newOption === "string") ?
                    <option
                      key={`${name}${newOption ? newOption : Date.now() + index}`}
                      value={newOption}
                    >
                      {newOption}
                    </option> :
                    <option
                      key={`${name}${newOption.value ? newOption.value : Date.now() + index}`}
                      value={newOption.value}
                    >
                      {newOption.label}
                    </option>
                })
              }

            </select>
          )}

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

    )
  }

export const SelectDB = forwardRef(SelectBase);

