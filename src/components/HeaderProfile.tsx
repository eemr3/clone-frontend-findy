import { Button } from "./Button";
import { Logo } from "./Logo";

export function HeaderProfile() {
  return (
    <header className="flex h-[9.977rem] items-center overflow-x-hidden bg-blue-dark">
      <Logo className="mbl-[4rem] ml-[8.035rem]" />

      <nav className="ml-[12.307rem] flex items-center">
        <Button>logout</Button>
      </nav>
    </header>
  );
}
