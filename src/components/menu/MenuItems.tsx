import { Link } from 'react-router-dom';
import { HomeMeuItems } from './HomeMeuItems';
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import { Button } from '../Button';

interface MenuItemsProps {
  home: boolean;
  urlPage?: string;
}

export default function MenuItems(props: MenuItemsProps) {
  const { signOut, isAuthenticated } = useContext(AuthContext);
  return (
    <div
      className={`flex w-[40%] items-center ${
        props.home ? ' justify-between' : 'justify-end'
      }`}
    >
      {isAuthenticated ? (
        <Link className="text-[18px] uppercase text-green-medium" onClick={signOut} to="">
          Logout
        </Link>
      ) : props.home ? (
        <HomeMeuItems />
      ) : (
        <Button url={`${props.urlPage}`}>Voltar</Button>
      )}
    </div>
  );
}
