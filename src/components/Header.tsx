import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "./Button";
import { Logo } from "./Logo";
import { AuthContext } from "../context/auth";

import IconMenu from "../assets/hamburger.svg";

export const Header = (props: { showJustify: boolean }) => {
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const { signOut, isAuthenticated } = useContext(AuthContext);
  function handleMenu() {
    setShowContent(!showContent);
  }

  function handleLogout() {
    signOut();
  }


  return (

    <>
      <div className="bg-gray-800 py-3 pt-[2rem]">
        <div
          className={`flex w-[51%]  items-center  justify-between 4xl:w-[49%] 3xl:w-[41%]  2xl:w-[51%] xl:w-full lg:justify-between  md:mx-[0] 
          ${props.showJustify ? "" : " pr-[2rem] xl:w-[100%!important]"}
          `}
        >
          <Link
            className={`ml-[4.624rem] ${props.showJustify ? "" : "mr-[12.3rem] sm:mr-[6rem]"}`}
            to="/"
          >
            <Logo />
          </Link>

          <button className="hidden pr-[4rem] lg:block" onClick={handleMenu}>
            <img src={IconMenu} alt="Menu" className="  h-[4rem] w-auto" />
          </button>

          <nav className={"mt-5 flex gap-[2rem] pl-[5rem] pr-[3rem] lg:hidden"}>
            {isAuthenticated ? (
              <Link to="/" onClick={() => handleLogout()}>
                <Button>
                  <p> Logout</p>
                </Button>
              </Link>
            ) : (
              <>
                <Button url="/login">
                  <p> Login</p>
                </Button>

                <Button url="/cadastro" fill={true}>
                  <p> Cadastre-se</p>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
      {showContent ? (
        <div className=" bg-gray-800 absolute right-5 top-[8rem] flex w-[20rem] items-center justify-center bg-blue-dark shadow-shadow-#2 lg:block ">
          <nav className=" mr-[3rem] w-[max-content] text-3xl font-bold text-white">
            {isAuthenticated ? (
              <ul>
                <li className=" border-b border-black p-[1rem]">
                  <button className="bg " onClick={() => handleLogout()}>
                    <p className="hover:text-green-dark">Logout</p>
                  </button>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="border-b border-black p-[1rem]">
                  <Link to="/login" className="hover:text-green-dark">
                    <button className="bg">Login</button>
                  </Link>
                </li>

                <li className="border-b border-black p-[1rem]">
                  <Link to="/cadastro" className="hover:text-green-dark">
                    <button className="bg">Cadastro</button>
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
