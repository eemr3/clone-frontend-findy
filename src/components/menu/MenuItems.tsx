import { Link } from 'react-router-dom';
import { HomeMeuItems } from './HomeMeuItems';
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import { Button } from '../Button';

interface MenuItemsProps {
  home: boolean;
}

export default function MenuItems(props: MenuItemsProps) {
  const { signOut, isAuthenticated } = useContext(AuthContext);
  return (
    <div
      className={`flex w-[40%] items-center ${
        props.home ? ' justify-between' : 'justify-end'
      }`}
    >
      {props.home ? (
        <HomeMeuItems isAuthenticated={isAuthenticated} signOut={signOut} />
      ) : (
        <Button url="/">Voltar</Button>
      )}
    </div>
  );
}
