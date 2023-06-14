import { Link } from 'react-router-dom';

interface HomeMenuItemsProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

export function HomeMeuItems(props: HomeMenuItemsProps) {
  return (
    <>
      {props.isAuthenticated ? (
        <Link
          className="text-[18px] uppercase text-green-medium"
          onClick={props.signOut}
          to=""
        >
          Logout
        </Link>
      ) : (
        <>
          <Link className="text-[18px] uppercase text-green-medium" to="/">
            A Findy
          </Link>
          <Link className="text-[18px] uppercase text-green-medium" to="/login">
            Login
          </Link>
          <Link
            className="flex h-[33.41px] w-[168.66px] 
          items-center justify-center rounded-[23.24px] border border-green-medium text-[18px] 
          uppercase text-green-medium"
            to="/cadastro"
          >
            Cadastro
          </Link>
        </>
      )}
    </>
  );
}
