import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react';

interface CheckboxProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  /* name: string; */
  id: string;
  label: string;
  labelClassName?: string;
  errors?: string | boolean | undefined;
  /*   optimus?: any; */
}

type CheckboxStates = { [key: string]: boolean };

const CheckboxBase: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  {
    /* name, */ id,
    label,
    labelClassName = '',
    errors,
    className = '' /* , onChange */,
    ...rest
  },
  ref,
) => {
  return (
    <label
      className={`flex gap-[0.6rem] text-[1.6rem] font-medium text-[#000] ${labelClassName}`}
    >
      <div
        className={
          errors
            ? 'relative h-[2.0rem] w-[2.0rem] rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
            : 'relative h-[2.0rem] w-[2.0rem] rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
        }
      >
        <input
          className={`h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]`}
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
