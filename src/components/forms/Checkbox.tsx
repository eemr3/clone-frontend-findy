import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";

interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  id: string;
  label: string;
  labelClassName?: string;
}

type CheckboxStates = { [key: string]: boolean };

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  { name, id, label, labelClassName = "", className = "", onChange, ...rest },
  ref
) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <label
      className={`flex w-fit items-center gap-8 text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1 ${labelClassName}`}
    >
      <div className="h-[4.0rem] w-[4.0rem] rounded-[0.514rem] border-[0.257rem] border-green-medium">
        <input
          className={`h-[3.6rem] w-[3.6rem] accent-green-medium ${className}`}
          type="checkbox"
          name={name}
          id={id}
          checked={isChecked}
          onChange={handleOnChange}
          ref={ref}
          {...rest}
        />
      </div>

      {label}
    </label>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
