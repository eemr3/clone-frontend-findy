import { DetailedHTMLProps, ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  id: string;
  label: string;
  labelClassName?: string;
}


const CheckboxBase: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps>
  = ({
    name,
    id,
    label,
    labelClassName = "",
    className = "",
    ...rest }, ref) => {

    return (
      <label className={`w-fit flex gap-8 items-center text-[2.4rem] leading-[2.813rem] tracking-[-0.5%] font-medium text-grey-#1 ${labelClassName}`}>
        <div className="w-[4.0rem] h-[4.0rem] border-[0.257rem] border-green-medium rounded-[0.514rem]">
          <input
            className={`w-[3.6rem] h-[3.6rem] accent-green-medium ${className}`}
            type="checkbox"
            name={name}
            id={id}
            ref={ref}
            {...rest}
          />
        </div>

        {label}
      </label>
    );
  }

export const Checkbox = forwardRef(CheckboxBase);

