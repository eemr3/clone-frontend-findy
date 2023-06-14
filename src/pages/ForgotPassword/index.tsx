import { ForgetPassword } from '../../components/ForgetPassword';
import { NavBar } from '../../components/menu/NavBar';

export function ForgotPassword() {
  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark opacity-90">
      <NavBar home={false} />
      <ForgetPassword />
    </div>
  );
}
