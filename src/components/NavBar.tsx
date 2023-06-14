import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export function NavBar() {
  const { signOut, isAuthenticated } = useContext(AuthContext);
  return (
    <nav>
      <div className="mx-auto flex max-w-[1356px] justify-between py-8 2xl:ml-[39.07px] 2xl:mr-[121.07px]">
        <div>
          <Logo className="h-[36.62px] w-[125px]" />
        </div>
        <div className="flex w-[40%] items-center justify-between">
          <Link className="text-[18px] uppercase text-green-medium" to="/">
            A Findy
          </Link>
          {isAuthenticated ? (
            <Link
              className="text-[18px] uppercase text-green-medium"
              onClick={signOut}
              to=""
            >
              Logout
            </Link>
          ) : (
            <Link className="text-[18px] uppercase text-green-medium" to="/login">
              Login
            </Link>
          )}
          <Link
            className="flex h-[33.41px] w-[168.66px] 
            items-center justify-center rounded-[23.24px] border border-green-medium text-[18px] 
            uppercase text-green-medium"
            to="/cadastro"
          >
            Cadastro
          </Link>
        </div>
      </div>
    </nav>
  );
}
