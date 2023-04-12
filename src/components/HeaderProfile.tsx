import { Button } from "./Button";
import { Logo } from "./Logo";

export function HeaderProfile() {
  return (
    <header className="flex h-[9.977rem] items-center bg-blue-dark overflow-x-hidden">
      <Logo className="ml-[8.035rem] mbl-[4rem]" />

      <nav className="ml-[12.307rem] flex items-center">
        <Button>logout</Button>
      </nav>
    </header>
  );
}
