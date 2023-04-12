import { useEffect, useState } from "react";
import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { getProjects } from "../../services/api";

interface Projects {
  language: any;
  map: any;
  projectScope: string;
  name: string;
}

export function ProjectRegistred() {
  // Teste de Error no nome e e-mail
  const [projects, setProjects] = useState<any[]>([]);

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  useEffect(() => {
    async function fetchData() {
      const response = await getProjects();
      setProjects(response.data);
    }

    fetchData();
  }, []);

  return (
    <section className="w-max-[144rem] flex  flex-col bg-[#FFFFFF] ">
      <HeaderProfile />

      <article className="pl-[15.9rem] pt-[6.414rem] min-h-[62rem] flex flex-col text-grey-#5 bg-blue-dark lg:px-[3rem] mbl:pb-[5rem]">
        <Heading type="lg-leading58" className="xl:text-[5rem] lg:text-[3.5rem]">
          Bem vindo(a) à Findy, (Nome do Usuário)!
        </Heading>

        <Heading type="lg-leading58" className="mt-[8rem] lg:text-[3rem]">
          Projetos cadastrados
        </Heading>

        <Text type="md" className="mt-[4rem] mt-[6.4rem] inline-block">
          Visualize os projetos disponíveis na Findy.
        </Text>
        <button className="mt-[5rem] h-[6rem] w-[60%] max-w-[40.6rem] rounded-[3.2rem] bg-[#01A195] px-[2.5rem]  mbl:h-[4rem] mbl:px-[0.1rem] mbl:w-[75%]">
          <p className="text-[2.4rem] text-[#FFFFFF]  mbl:text-[1.5rem] ">
            ADICIONAR NOVO PROJETO
          </p>
        </button>
      </article>

      <section className="mt-[10.2rem] flex  flex-col gap-[3rem] pt-[8rem] bg-[#FFFFFF] m pb-[10rem] mbl:pt-[2rem] mbl:px-[1.5rem] md:px-[2rem]  md:pt-[0]  xl:px-[2rem] ">
        <div className="mx-auto w-[100%] h-[100%] flex flex-col gap-[3rem]  items-center ">
        {projects?.map((project: Projects) => {
          return (
          <div className="mx-auto flex h-[100%] h-[100%] w-[100%] max-w-[120rem] items-center shadow-shadow-#1">
              <div className="h-[19.3rem] w-[1.3rem] rounded-br-[0.8rem] rounded-tr-[0.8rem] bg-[#01A195] mbl:w-[0.8rem]  mbl:h-[15rem]  md:w-[1rem] md:h-[15rem]"></div>
              <div className="w-[100%] pl-[11.5rem] pr-[6.7rem] pt-[3rem] pb-[1rem] mbl:pl-[2rem] mbl:pr-[1rem] font-bold md:pl-[4rem]">
                <h3 className="mb-[1.2rem] text-[4.8rem] xl:text-[4rem] lg:text-[1.5rem] mbl:text-[1.6rem] lg:text-[2.2rem]">{project?.name}</h3>
                <p className="mb-[3rem] text-[3.2rem] xl:text-[2.5rem] lg:text-[1.5rem] lg:text-[1.7rem]" >
                  {project?.projectScope}
                </p>
                <div className="mb-[2rem] flex gap-[2rem]">
                  <p className="h-[2rem] w-[10rem] rounded-[1rem] bg-[#01A195] px-[1rem] text-[1.5rem] text-[white]">
                    teste
                  </p>
                </div>
                <div className="flex items-end justify-end gap-[4rem] mb-[3rem]">
                  <button className="h-[6rem] w-[60%] xl:h-[5rem] lg:h-[4rem] lg:px-[1rem]  max-w-[40.6rem] rounded-[3.2rem] border border-[#01A195] bg-[#ffffff] px-[1.7rem] mbl:w-[65%]  mbl:h-[2.5rem]  mbl:max-w-[16rem] md:w-[75%] md:max-w-[27rem] md:h-[3rem] lg:w-[48%] ">
                    <p className="text-[2.4rem] text-[#01A195] xl:text-[2rem]   lg:text-[1.5rem] mbl:text-[0.9rem] md:text-[1.5rem] ">
                      CADASTRE-SE NESSE PROJETO
                    </p>
                  </button>
                  <button className=" h-[6rem] w-[60%] xl:h-[5rem] lg:h-[4rem] lg:px-[1rem] lg:w-[45%] mbl:px-[0.1rem]  mbl:w-[30%]  mbl:h-[2.5rem]   max-w-[15.6rem] rounded-[3.2rem] bg-[#01A195] px-[2.5rem] md:w-[30%] md:max-w-[10rem] md:h-[3rem] ">
                    <p className="text-[2.4rem] text-[#FFFFFF] xl:text-[2rem] lg:text-[1.5rem]  mbl:text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem]">Ver Tudo</p>
                  </button>
                </div>
              </div>
              </div>
          );
        })}
        </div>
      </section>
    </section>
  );
}
