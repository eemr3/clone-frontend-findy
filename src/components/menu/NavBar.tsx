import { Logo } from '../Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import MenuItems from './MenuItems';
import { HomeMeuItems } from './HomeMeuItems';
import { LogoSmall } from '../LogoSmall';

interface NavBarProps {
  home: boolean;
  url?: string;
}
export function NavBar(props: NavBarProps) {
  return (
    <nav>
      <div
        className="mx-auto flex max-w-[135.6rem] justify-between py-8 2xl:ml-[39.07px] 
      2xl:mr-[121.07px]"
      >
        <div>
          <LogoSmall />
        </div>
        <MenuItems urlPage={props.url} home={props.home} />
      </div>
    </nav>
  );
}
