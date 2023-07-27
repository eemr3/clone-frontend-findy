import { Link } from 'react-router-dom';

interface LinkActionProps {
  url: string;
  text: string;
}
export function ActionLink({ url, text }: LinkActionProps) {
  return (
    <>
      <Link
        className="flex h-[33.41px] w-[168.66px] 
        items-center justify-center rounded-[23.24px] 
        border border-green-medium text-[18px] 
        uppercase text-green-medium"
        to={url}
      >
        {text}
      </Link>
    </>
  );
}
