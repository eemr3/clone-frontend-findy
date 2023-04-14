import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from "react";

interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /* name: string; */
  id: string;
  label: string;
  labelClassName?: string;
  /*   optimus?: any; */
}

type CheckboxStates = { [key: string]: boolean };

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  {
    /* name, */ id,
    label,
    labelClassName = "",
    className = "" /* , onChange */,
    ...rest
  },
  ref
) => {
  return (
    <label
      className={`flex w-fit items-center gap-8 text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1 mbl:text-[1.1rem] ${labelClassName}`}
    >
      <div className="h-[4.0rem] w-[4.0rem] rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:w-[1.9rem]  mbl:h-[1.8rem] mbl:flex mbl:items-center mbl:justify-center  ">
        <input
          className={`h-[3.6rem] w-[3.6rem] accent-green-medium ${className} mbl:w-[1.6rem] mbl:h-[1.7rem] `}
          type="checkbox"
          /* name={name} */
          id={id}
          /* checked={isChecked}
            onChange={handleOnChange} */
          /*           optinus={optinus} */
          ref={ref}
          {...rest}
        />
      </div>

      {label}
    </label>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
