
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
        <div className={`flex w-full items-center md:mx-[0]  lg:justify-between ${
          props.showJustify ? "justify-between" : ""
        }`}>
        
        <Link to="/" className="pointer">
          <Logo
            className={`ml-[4.624rem] sm:max-w-[8.1rem] sm:h-[2.3rem] ${
              props.showJustify ? "" : "mr-[12.3rem] sm:mr-[6rem]"
            }`}
          />
        </Link>
          <button className="hidden lg:block pr-[4rem]" onClick={handleMenu}>
            <img
              src={IconMenu}
              alt="Menu"
              className="  w-[4rem] h-[4rem]"
            />
          </button>
          <nav
          className={ "lg:hidden flex gap-[2rem] mt-5 "}
        >
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
      <div className=" bg-gray-800 flex justify-center items-center absolute w-[20rem] bg-blue-dark right-5 hidden top-[8rem] lg:block shadow-shadow-#2 ">
          
      <ul className="text-white text-3xl font-bold">
        <li className=" p-[1rem] border-b border-black">
        <button className="bg">
        <Link to="/login" className="hover:text-green-dark">Login</Link>
        </button>

      
         </li>
         <li className="p-[1rem]">
         <button className="bg">
        <Link to="/cadastro" className="">Cadastro</Link>
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

