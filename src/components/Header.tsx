import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function Header(props: { showJustify: boolean }) {
  return (
    <header className="flex h-[9.977rem] items-center bg-blue-dark overflow-x-hidden" >
      <div
        className={`flex w-full items-center md:mx-[0] ${
          props.showJustify ? "justify-between" : ""
        }`}
      >
        <Link to="/">
          <Logo
            className={`ml-[4.624rem] ${
              props.showJustify ? "" : "mr-[12.3rem] sm:mr-[6rem]"
            }`}
          />
        </Link>

        <nav className="flex items-center gap-5 ">
          <Button>
            <Link to="/login">Login</Link>
          </Button>

          <Button fill={true}>
            <Link to="/cadastro">Cadastre-se</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
