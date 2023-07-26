import { ForgetPassword } from '../../components/ForgetPassword';
import { LogoSmall } from '../../components/LogoSmall';
import { Menu } from '../../components/menu';

export function ForgotPassword() {
  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark opacity-90">
      <Menu.Root>
        <LogoSmall />
        <Menu.MenuItems className="justify-between">
          <Menu.Items />
          <Menu.Action url="/login" text="Voltar" />
        </Menu.MenuItems>
      </Menu.Root>
      <ForgetPassword />
    </div>
  );
}
