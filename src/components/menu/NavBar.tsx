import { Logo } from '../Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import MenuItems from './MenuItems';
import { HomeMeuItems } from './HomeMeuItems';

interface NavBarProps {
  home: boolean;
}
export function NavBar(props: NavBarProps) {
  return (
    <nav>
      <div className="mx-auto flex max-w-[1356px] justify-between py-8 2xl:ml-[39.07px] 2xl:mr-[121.07px]">
        <div>
          <Logo className="h-[36.62px] w-[125px]" />
        </div>
        <MenuItems home={props.home} />
      </div>
    </nav>
  );
}
