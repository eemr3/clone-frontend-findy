import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "./Button";
import { Logo } from "./Logo";
import { AuthContext } from "../context/auth";
import IconMenu from "../assets/hamburger.svg";

export function HeaderProfile(props: { showJustify: boolean }) {
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const { signOut, isAuthenticated } = useContext(AuthContext);
  function handleMenu() {
    setShowContent(!showContent);
  }
  function handleLogout() {
    signOut();

    setTimeout(() => { });
  }
  return (
    <>
      <div className="bg-gray-800 py-3 pt-[2rem]">
        <div
          className={`flex w-[100%]  items-center  justify-between lg:justify-between  md:mx-[0]`}
        >
          <Link to="/" className="pointer">
            <Logo
              className={`ml-[4.624rem] sm:h-[3.5rem] sm:max-w-[10.5rem] `}
            />
          </Link>
          <button className="hidden pr-[4rem] lg:block" onClick={handleMenu}>
            <img src={IconMenu} alt="Menu" className="  h-[4rem] w-auto" />
          </button>
          <nav
            className={"mt-5 flex gap-[2rem] pl-[5rem] pr-[4rem] lg:hidden "}
          >
            {isAuthenticated ? (
              <>
                <Button>
                  <Link to="/">
                    <p> Logout</p>{" "}
                  </Link>
                </Button>

                {/*  <Button>
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
                </Button> */}
              </>
            ) : (
              <>
                {/*
                <Button>
                  <Link to="/cadastro">
                    <p> Cadastre-se</p>
                  </Link>
                </Button>
            

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
                </Button> */}
              </>
            )}
          </nav>
        </div>
      </div>
      {showContent ? (
        <div className=" bg-gray-800 absolute right-5 top-[8rem] flex w-[20rem] items-center justify-center bg-blue-dark shadow-shadow-#2 lg:block ">
          <ul className=" w-[max-content] text-3xl font-bold text-white">
            {/* <li className=" border-b border-black p-[1rem]">
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
 */}
            {isAuthenticated ? (
              <>
                <li className=" border-b border-black p-[1rem]">
                  <button className="bg" onClick={() => handleLogout()}>
                    Logout
                  </button>
                </li>
                {/*  <li className="border-b border-black p-[1rem] p-[1rem]">
                  <button className="bg">
                    <Link to="/profile" className="hover:text-green-dark">
                      profile
                    </Link>
                  </button>
                </li>
                <li className="border-b border-black p-[1rem] p-[1rem]">
                  <button className="bg">
                    <Link
                      to="/project_registered"
                      className="hover:text-green-dark"
                    >
                      Projetos Registrados
                    </Link>
                  </button>
                </li> */}
              </>
            ) : (
              <>
                <li className=" border-b border-black p-[1rem]">
                  <button className="bg">
                    <Link to="/login" className="hover:text-green-dark">
                      Login
                    </Link>
                  </button>
                </li>
                <li className="border-b border-black p-[1rem]">
                  <button className="bg">
                    <Link to="/cadastro" className="hover:text-green-dark">
                      Cadastro
                    </Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
