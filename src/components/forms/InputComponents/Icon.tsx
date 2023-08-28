import { ElementType } from "react"
import { VariantProps, tv } from "tailwind-variants"


const iconVariants = tv({
  base: 'flex items-center justify-center w-[4.5rem] h-[4.5rem] mr-[1rem]',
  variants: {
    style:{
      onlyIcon: 'px-5 px-5 stroke-blue-dark-#1',
      bgBlue: 'px-5 bg-blue-dark-#1 px-5 rounded-l-[0.5rem]',
    }
  },
  defaultVariants: {
    style: 'onlyIcon'
  }
})


interface IconProps extends VariantProps<(typeof iconVariants)>{
  icon: ElementType
}

export function Icon({  icon : IconElement,style }:IconProps){
  return(
    <div
      className={iconVariants({ style })}
    >
      {<IconElement className='mbl:max-w-[2rem]'  />}
    </div>
  )
}