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

  function handleLogout() {
    logout();

    setTimeout(() => { });
  }
  return (

    /* <header className="flex h-[9.977rem] items-center bg-blue-dark">
          <div
            className={`flex w-full items-center md:mx-[0] ${props.showJustify ? "justify-between" : ""
              }`}
          >
            <Link
              className={`ml-[4.624rem] ${props.showJustify ? "" : "mr-[12.3rem] sm:mr-[6rem]"}`}
              to="/"
            >
              <Logo />
            </Link> */


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
          {/* <Link to="/" className="pointer">
            <Logo className="ml-[4.624rem] sm:h-[3.5rem] sm:max-w-[10.5rem]" />
          </Link> */}

          <button className="hidden pr-[4rem] lg:block" onClick={handleMenu}>
            <img src={IconMenu} alt="Menu" className="  h-[4rem] w-auto" />
          </button>
          {/* <nav className="flex items-center gap-5 "> */}
          <nav className={"mt-5 flex gap-[2rem] pl-[5rem] pr-[3rem] lg:hidden"}>
            {authenticated ? (
              <Link to="/" onClick={() => handleLogout()}>
                <Button>
                  <p> Logout</p>
                </Button>
              </Link>
            ) : (
              <>
                <Button url="/login">
                  Login
                </Button>

                {/* <Link to="/login">
                  <Button>
                    <p> Login</p>
                  </Button>
                </Link> */}

                <Button fill={true} url="/cadastro">
                  Cadastre-se
                </Button>
                {/* <Link to="/cadastro">
                  <Button>
                    <p> Cadastre-se</p>
                  </Button>
                </Link> */}


              </>
            )}

            {/* {props.showJustify && authenticated ? (
              ""
            ) : (
              <>
                <Button>
                  <Link to="/project">
                    <p>novo projeto</p>{" "}
                  </Link>
                </Button>
                <Button>
                  <Link to="/profile">
                    <p> profile</p>
                  </Link>
                </Button>
                <Button>
                  <Link to="/project_registered">
                    {" "}
                    <p> Projetos Registrados</p>
                  </Link>
                </Button>
              </>
            )} */}
          </nav>
        </div>
      </div >
      {
        showContent ? (
          <div className=" bg-gray-800 absolute right-5 top-[8rem] flex w-[20rem] items-center justify-center bg-blue-dark shadow-shadow-#2 lg:block " >
            <nav className=" mr-[3rem] w-[max-content] text-3xl font-bold text-white">

              {authenticated ? (
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
                      <button className="bg">
                        Login
                      </button>
                    </Link>
                  </li>

                  <li className="border-b border-black p-[1rem]">
                    <Link to="/cadastro" className="hover:text-green-dark">
                      <button className="bg">
                        Cadastro
                      </button>
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
