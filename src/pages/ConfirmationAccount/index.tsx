import BigLogo from '../../assets/big-logo.svg';
import { NavBar } from '../../components/menu/NavBar';

export function ConfimationAccount() {
  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark opacity-90">
      <NavBar home={false} />
      <div className="my-auto flex">
        <div className="flex w-[610px] flex-col">
          <p className="h-[95px] w-[603px] text-right text-[40px] font-bold leading-[44px] text-[#F9F9F9]">
            Quase lá! Um e-mail <br />
            <span>de confirmação foi enviado.</span>
          </p>
          <p className="h-[44px] w-[566px] self-end text-right text-[32px] font-bold leading-[44px] text-[#F9F9F9]">
            Confira sua caixa de entrada.
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 right-0">
        <img src={BigLogo} alt="Logo" />
      </div>
      <footer>© Todos direitos reservados a Findy.</footer>
    </div>
  );
}
