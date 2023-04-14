import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { SVGIcon } from "../../types/SVGIcon";
import { Text } from "../Text";
import { Spinner } from "../Spinner";
import { TextErrorMessage } from "./TextErrorMessage";

export type ValueLabel = {
  value: string;
  label: string;
};

interface SelectDBProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: ValueLabel[] | string[];
  name?: string;
  label?: string;
  placeholder?: string;
  icon?: SVGIcon;
  error?: string | null;
  fieldSetClassName?: string;
  whenListIsEmpty?: "Spinner" | "disabled";
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectDBProps> = (
  {
    options,
    name = "",
    label,
    placeholder,
    icon = undefined,
    error = null,
    whenListIsEmpty = "Spinner",
    fieldSetClassName = "",
    className = "",
    defaultValue = "",
    ...rest
  },
  ref
) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => selectRef.current
  );

  const [selectValue, setSelectValue] = useState(
    ref ? "" : !!rest.value ? rest.value : defaultValue
  );

  return (
    <fieldset
      className={`flex w-fit flex-col gap-[1.2rem] ${fieldSetClassName}`}
      onClick={() => {
        if (selectRef.current) selectRef.current.focus();
      }}
    >
      {!!label && (
        <label
          htmlFor={name}
          className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1"
        >
          {label}
        </label>
      )}

      <div className="flex h-[6.631rem] w-[42.5rem] rounded-[0.8rem] border-[0.1rem] border-grey-#1 bg-white">
        {icon && (
          <div className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.6rem] rounded-tl-[0.6rem] bg-blue-dark-#1">
            <>{icon}</>
          </div>
        )}

        {!options.length && whenListIsEmpty === "Spinner" ? (
          <div className="flex w-[33.2rem] flex-col items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <select
            name={name}
            id={name}
            disabled={!options.length && whenListIsEmpty === "disabled"}
            ref={ref}
            className={`${className} ml-[2rem] w-[33.2rem] border-none bg-white text-[2.4rem] font-medium leading-[2.831rem] tracking-[-0.5%] text-grey-#1 outline-none placeholder:text-grey-#2`}
            value={!ref ? selectValue : rest.value}
            onChange={(e) => setSelectValue(e.currentTarget.value)}
            {...rest}
          >
            {placeholder && (
              <option key="placeholder" value="" disabled>
                {placeholder}
              </option>
            )}

            {options &&
              options
                .sort()
                .map((newOption: string | ValueLabel, index: number) => {
                  return typeof newOption === "string" ? (
                    <option
                      key={`${name}${newOption ? newOption : Date.now() + index
                        }`}
                      value={newOption}
                    >
                      {newOption}
                    </option>
                  ) : (
                    <option
                      key={`${name}${newOption.value ? newOption.value : Date.now() + index
                        }`}
                      value={newOption.value}
                    >
                      {newOption.label}
                    </option>
                  );
                })}
          </select>
        )}
      </div>

      {!!error &&
        <TextErrorMessage
          errorMessage={error}
        />
      }
    </fieldset>
  );
};

export const SelectDB = forwardRef(SelectBase);
