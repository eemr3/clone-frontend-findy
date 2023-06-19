import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { SVGIcon } from "../../types/SVGIcon";
import { Text } from "../Text";
import { SelectArrowUpIcon } from "../icons/SelectArrowUpIcon";
import { SelectArrowDownIcon } from "../icons/SelectArrowDownIcon";

export type ValueLabel = {
  value: string;
  label: string;
};

interface InputDBv2Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  options: ValueLabel[] | string[];
  name?: string;
  label?: string;
  requiredField?: boolean;
  type?: string;
  placeholder?: string;
  icon?: SVGIcon;
  error?: string;
  fieldSetClassName?: string;
  fieldSetBG?: string;
  wantInputWidthFull?: boolean;
  errorClassName?: string;
  onClickOption?: (option: string) => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputDBv2Props> = (
  {
    options,
    name = "",
    label,
    requiredField = false,
    placeholder,
    icon = undefined,
    type = "text",
    error = null,
    fieldSetClassName = "",
    fieldSetBG = "",
    wantInputWidthFull = false,
    className = "",
    onChange,
    errorClassName = "",
    onClickOption,
    ...rest
  },
  ref
) => {
  const [openList, setOpenList] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputLabelRef = useRef<HTMLInputElement>(null);
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenList);
    return () => {
      document.removeEventListener("mousedown", closeOpenList);
    };
  }, []);

  const closeOpenList = (e: MouseEvent) => {
    if (
      !listRef.current ||
      !inputLabelRef.current ||
      !inputLabelRef.current.parentElement
    )
      return;

    if (
      !listRef.current.contains(e.target as Node) &&
      !inputLabelRef.current.contains(e.target as Node) &&
      !inputLabelRef.current.parentElement.contains(e.target as Node)
    ) {
      setOpenList(false);
    }
  };

  function toggleList() {
    setOpenList((prevState) => !prevState);
  }

  function setInputValue(newValue: string | ValueLabel) {
    if (
      inputRef.current?.value !== undefined &&
      inputLabelRef.current?.value !== undefined
    ) {
      let selectedOption: ValueLabel | string | undefined;
  
      if (typeof newValue === "string") {
        for (const option of options) {
          if (typeof option === "string" && option === newValue) {
            selectedOption = option;
            break;
          }
        }
      } else {
        const selectedValue = newValue?.value || "";
        for (const option of options) {
          if (typeof option !== "string" && option.value === selectedValue) {
            selectedOption = option;
            break;
          }
        }
      }
  
      if (selectedOption) {
        const value = typeof selectedOption === "string" ? selectedOption : selectedOption.value;
        const label = typeof selectedOption === "string" ? selectedOption : selectedOption.label;
  
        inputRef.current.value = value;
        inputLabelRef.current.value = label;
        setSelectedValue(value);
        setOpenList(false);
  
        if (onClickOption) {
          onClickOption(value);
        }
      }
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
        className={`flex h-[3.6rem] w-[50.5rem] py-[0.8rem] px-[1.6rem] border-grey-#2 ${
          openList
            ? "rounded-t-[0.8rem] border-x border-t bg-green-light"
            : errorClassName
            ? `rounded-[0.8rem] border bg-white ${errorClassName}`
            : "rounded-[0.8rem] border bg-grey-#4"
        } ${fieldSetBG} ${wantInputWidthFull ? "w-full" : ""}`}
        onClick={() => toggleList()}
      >
        {icon && (
          <div className="flex w-[5.3rem] items-center justify-center rounded-bl-[0.3rem] rounded-tl-[0.3rem] bg-blue-dark-#1">
            {/* {icon} */}
          </div>
        )}

        <input
          ref={inputLabelRef}
          type={type}
          placeholder={placeholder}
          readOnly
          className={`w-full border-none text-[1.4rem] font-medium leading-[1.82rem] outline-none disabled:bg-grey-#3 ${
            openList
              ? "bg-green-light text-blue-dark-#1 placeholder:text-blue-dark-#1"
              : errorClassName
              ? `bg-white text-red placeholder:text-red`
              : "bg-grey-#4 text-green-medium placeholder:text-grey-#2"
          } ${className} ${fieldSetBG} ${wantInputWidthFull ? "w-[96%]" : ""}`}
          {...rest}
        />

        <input name={name} ref={inputRef} className="hidden" />

        {openList ? <SelectArrowUpIcon /> : <SelectArrowDownIcon />}
      </div>

      {options && openList && (
        <div className="bg-white overflow-hidden z-10 border-x border-b border-t-2 border-grey-#2 rounded-b-[0.8rem]">
          <ul
            className="overflow-y-auto max-h-[14.4rem] text-grey-#2 text-[1.4rem] leading-[1.82rem] font-medium"
            ref={listRef}
          >
            {options.map((newOption: string | ValueLabel, index: number) => {
              const value = typeof newOption === "string" ? newOption : newOption.value;
              const label = typeof newOption === "string" ? newOption : newOption.label;
              return (
                <li
                  className="py-[0.85rem] px-4 hover:bg-green-light hover:text-green-medium hover:border-l-green-dark hover:border-l-[0.3rem]"
                  key={`${name}${value ? value : Date.now() + index}`}
                  onClick={() => setInputValue(newOption)}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && (
        <Text
          type="sm"
          color="red"
          className={`pt-2 px-1 ${errorClassName ? errorClassName : ""}`}
        >
          {error}
        </Text>
      )}
    </fieldset>
  );
};

export const SelectDBv2 = forwardRef(InputBase);
