import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import c from "../../../assets/c.svg";
import mulherPagePrincipal from "../../../assets/mulher-page-principal.svg";
import mulherPagePrincipal3 from "../../../assets/mulher-page-principal3.svg";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";

export function Home() {
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setLarguraTela(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="h-[100%] bg-blue-dark ">
      <Header showJustify={false} />
      <div className="w-max-[144rem]  h-[calc(100vh - 10rem)]  bg-blue-dark">
        {larguraTela > 1200 ? (
          <div className=" flex h-[90%] items-center xl:flex xl:flex-col-reverse xl:items-start ">
            <div className="ml-[12.909rem] flex w-[53rem] flex-col 4xl:ml-[25rem] 4xl:w-[70%] 3xl:ml-[17rem]   2xl:w-[40%] md:ml-[0] md:w-[80%]">
              <h1 className="mt-[9.9rem] w-[100%] text-[1.4rem] font-bold leading-[7.25rem] tracking-[-0.018em] text-grey-#5 ">
                Seja um voluntário tech!
              </h1>

              <span className="mt-[3.2rem] inline-block w-[45.8rem] text-[2.4rem] font-medium text-grey-#5 md:w-[100%]  ">
                Você é um jovem talento em busca de experiências na área de
                tecnologia? Então conheça a Findy!
              </span>

              <Button
                fill={true}
                className="mb-[4rem] mt-[6.4rem] h-[4.2rem] w-[35.6rem] text-[2.2rem]"
              >
                <a href="https://docs.google.com/forms/d/1GZBzYZRTHoU-waL6NLZ6BDHZsS6SrvjWAgf_YUC-eZQ/viewform?edit_requested=true">
                  CLIQUE PARA COMEÇAR
                </a>
              </Button>
            </div>

            <img
              src={mulherPagePrincipal}
              alt="mulher"
              className="absolute right-[4rem] top-[-1rem] h-[110rem] object-cover 2xl:w-[60rem] md-h:h-[80rem]"
            />
          </div>
        ) : (
          <div className=" flex h-[90%]  items-center xl:flex xl:flex-col-reverse">
            <div className="flex gap-[1rem] sm:max-h-[2.1rem] sm:max-w-[26.7rem]  sm:mt-[4rem] sm:mb-[4rem]">
              <img src={c} alt="direitos reservados" />
              <p className="text-white sm:text-[1.4rem]">
                Todos os direitos reservados a Findy
              </p>
            </div>
            <div className="ml-[12.909rem] flex w-[53rem] flex-col 4xl:ml-[25rem] 4xl:w-[70%] 3xl:ml-[17rem] 2xl:ml-[7rem]  2xl:w-[80%] lg:ml-[0] md:w-[80%] ">
              <h1 className="mt-[9.9rem] w-[100%] text-[6.4rem] font-bold leading-[7.25rem] tracking-[-0.018em] text-grey-#5 sm:leading-[4rem] mbl:text-[3.2rem]">
                Seja um voluntário tech!
              </h1>

              <span className="mt-[3.2rem] inline-block w-[45.8rem] text-[2.4rem] font-medium text-grey-#5 md:w-[100%] mbl:text-[1.6rem]">
                Você é um jovem talento em busca de experiências na área de
                tecnologia? Então conheça a Findy!
              </span>

              <img
                src={mulherPagePrincipal3}
                alt="mulher"
                className="right-[4rem] top-[-1rem] mt-[2.4rem]  object-cover "
              />

              <div className="flex justify-center sm:h-[4.2rem] sm:w-[100%] sm:px-[0] sm:pb-[3.8rem] sm:pt-[2.8rem]">
                <Button
                  fill={true}
                  className="mb-[4rem] mt-[6.4rem] h-[4.2rem] w-[35.6rem] text-[2.2rem] sm:m-[0] sm:w-[100%]"
                >
                  <Link to="/login" className="sm:text-[1.4rem]">
                    CLIQUE PARA COMEÇAR
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
