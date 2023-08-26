


interface ErrorProps {
  error: string
}
export function ErrorMessage({error}:ErrorProps){
  return(
    <p
      className='text-red text-[1.3rem] md:text-[1rem] mt-[0.5rem] font-[500] leading-snug tracking-wide mbl:font-bold'
    >
      {`${error}`}
    </p>
  )
}