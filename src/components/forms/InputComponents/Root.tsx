import { ReactNode } from "react"

interface RootProps {
  children: ReactNode
}

export function Root({ children }: RootProps){
  return(
    <fieldset
      className={'flex flex-col w-[100%]'}
    >
       {children}
    </fieldset>
  )
}