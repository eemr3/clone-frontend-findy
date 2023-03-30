import { Button } from "./Button";
import { Link } from "./Link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="flex h-[9.977rem] items-center bg-blue-dark">
      <div className="mx-[7.71088rem] flex w-full items-center justify-between">
        <Logo className="ml-[4.624rem]" />

        <nav className="flex items-center gap-5">
          <Link href="#" className="mr-[6.4rem] text-[1.557rem] leading-[1.824rem] tracking-[0.126rem] ">
            Sobre Nós
          </Link>

          <Button>login</Button>

          <Button fill={true}>Sign Up</Button>
        </nav>
      </div>
    </header>
  );
}
