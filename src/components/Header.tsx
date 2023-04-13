import React from "react";
import { Link } from "react-router-dom";
import IconMenu from "../assets/hamburger.svg";
import { Button } from "./Button";
import { Logo } from "./Logo";

export const Header = (props: { showJustify: boolean }) => {
  const [showContent, setShowContent] = React.useState<boolean>(false);

  function handleMenu() {
    setShowContent(!showContent);
  }

  return (
    <>
      <div className="bg-gray-800 py-3 pt-[2rem]">
        <div
          className={`flex w-full items-center lg:justify-between  md:mx-[0] ${
            props.showJustify ? "justify-between" : ""
          }`}
        >
          <Link to="/" className="pointer">
            <Logo
              className={`ml-[4.624rem] sm:h-[2.3rem] sm:max-w-[8.1rem] ${
                props.showJustify ? "" : "mr-[12.3rem] sm:mr-[6rem]"
              }`}
            />
          </Link>
          <button className="hidden pr-[4rem] lg:block" onClick={handleMenu}>
            <img src={IconMenu} alt="Menu" className="  h-[4rem] w-[4rem]" />
          </button>
          <nav className={"mt-5 flex gap-[2rem] lg:hidden "}>
            <Button>
              <Link to="/login">Login</Link>
            </Button>

            <Button fill={true}>
              <Link to="/cadastro">Cadastre-se</Link>
            </Button>
          </nav>
        </div>
      </div>
      {showContent ? (
        <div className=" bg-gray-800 absolute right-5 top-[8rem] flex hidden w-[20rem] items-center justify-center bg-blue-dark shadow-shadow-#2 lg:block ">
          <ul className="text-3xl font-bold text-white">
            <li className=" border-b border-black p-[1rem]">
              <button className="bg">
                <Link to="/login" className="hover:text-green-dark">
                  Login
                </Link>
              </button>
            </li>
            <li className="p-[1rem]">
              <button className="bg">
                <Link to="/cadastro" className="hover:text-green-dark">
                  Cadastro
                </Link>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
