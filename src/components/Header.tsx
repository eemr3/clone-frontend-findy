import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IconMenu from "../assets/hamburger.svg";
import { AuthContext } from "../context/auth";
import { Button } from "./Button";
import { Logo } from "./Logo";

export const Header = (props: { showJustify: boolean }) => {
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const { logout, authenticated } = useContext(AuthContext);
  function handleMenu() {
    setShowContent(!showContent);
  }

  return (
    <>
      <div className="bg-gray-800 py-3 pt-[2rem]">
        <div
          className={`flex w-[51%] items-center  justify-between 4xl:w-[49%] 3xl:w-[41%]  2xl:w-[51%] xl:w-full lg:justify-between  md:mx-[0] ${
            props.showJustify ? "justify-between" : ""
          }`}
        >
          <Link to="/" className="pointer">
            <Logo
              className={`ml-[4.624rem] sm:h-[3.5rem] sm:max-w-[10.5rem] ${
                props.showJustify ? "" : "mr-[12.3rem] sm:mr-[6rem]"
              }`}
            />
          </Link>
          <button className="hidden pr-[4rem] xl:block" onClick={handleMenu}>
            <img src={IconMenu} alt="Menu" className="  h-[4rem] w-auto" />
          </button>
          <nav className={"mt-5 flex gap-[2rem] pl-[5rem] xl:hidden"}>
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
            <li className="border-b border-black p-[1rem] p-[1rem]">
              <button className="bg">
                <Link to="/cadastro" className="hover:text-green-dark">
                  Cadastro
                </Link>
              </button>
            </li>

            {authenticated ? (
              <>
                <li className=" border-b border-black p-[1rem]">
                  <button className="bg">
                    <Link to="/projeto" className="hover:text-green-dark">
                      projeto
                    </Link>
                  </button>
                </li>
                <li className="border-b border-black p-[1rem] p-[1rem]">
                  <button className="bg">
                    <Link to="/profile" className="hover:text-green-dark">
                      profile
                    </Link>
                  </button>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
