
import { tv,VariantProps } from 'tailwind-variants'

const variantsLabel = tv({
  base: 'lg:text-lg md:text-md sm:text-sm mb-[0.5rem] p-0 sm:mb-[1rem] mbl:mb-[0.5rem] font-medium mbl:font-bold',
  variants: {
    size:{
      sm: 'text-sm',
      md: 'text-[1.5rem]',
      lg: 'text-[2rem]'
    },
    hasError:{
      true: 'text-red',
      false: 'text-black'
    },
  },
  defaultVariants:{
    size: 'lg',
    hasError: false
  }
})

interface labelProps extends VariantProps<typeof variantsLabel>{
  label: string;
  inputName: string;
}

export function Label({ label,inputName, hasError = false, size }: labelProps){
  return(
    <label
      htmlFor={inputName}
      className={variantsLabel({ hasError,size })} 
    >
      {label}
    </label>
  )
}