import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Tag } from "../../components/Tag";
import { Text } from "../../components/Text";
import { getLanguagesById, getProjects } from "../../services/api";

interface Projects {
  id: number;
  language: any;
  map: any;
  projectScope: string;
  name: string;
}

export function ProjectRegistred() {
  // Teste de Error no nome e e-mail
  const [projects, setProjects] = useState<any[]>([]);
  const [nameUser, setNameUser] = useState("");
  const [languageNames, setlanguageNames] = useState<any[]>([]);
  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  useEffect(() => {
    async function fetchData() {
      const response = await getProjects();

      setProjects(response.data);
      const languages = await Promise.all(
        response.data.map(async (project: any) => {
          const languageIds = project.language;
          const languagePromises = languageIds.map((stackId: any) =>
            getLanguagesById(stackId?.stackId)
          );
          const languageNames = await Promise.all(languagePromises);
          return languageNames;
        })
      );
      console.log(languages);

      setlanguageNames(languages);
    }
    const token: string | any = localStorage.getItem("token");
    const { name }: any = jwt_decode(token);
    setNameUser(name);

    fetchData();
  }, []);

  /*   async function getLanguageNames(projectId: number): Promise<string[]> {
    const languageIds = projects.find((project) => project.id === projectId)?.languagesIds || [];
    const languagePromises = languageIds.map(async (languageId: string) => {
      const response = await getLanguagesById(languageId);
      return response.data.name;
    });
    const languageNames = await Promise.all(languagePromises);
    return languageNames;
  } */

  return (
    <section className="w-max-[144rem] flex  flex-col  bg-blue-dark">
      <Header showJustify={false} />

      <article className="flex min-h-[max-context] flex-col items-center justify-center bg-blue-dark pl-[15.9rem] pt-[6.414rem] text-grey-#5 lg:px-[3rem] mbl:justify-center mbl:pb-[5rem]">
        <Heading
          type="lg-leading58"
          className="text-[5.5rem] leading-[5rem] xl:text-[5rem] lg:text-[4rem] mbl:text-[2.2rem] "
        >
          Bem vindo(a) à Findy, ({nameUser.toUpperCase()})!
        </Heading>

        <Heading
          type="lg-leading58"
          className="mt-[8rem] text-[4.5rem]  leading-[6rem] xl:text-[4rem]  lg:text-[2.5rem] mbl:text-[1.8rem]"
        >
          Projetos cadastrados
        </Heading>

        <Text
          type="md"
          className=" inline-block xl:text-[2rem] lg:text-[1.5rem] mbl:text-[1.4rem] "
        >
          Visualize os projetos disponíveis na Findy.
        </Text>
        <button className="mt-[5rem] h-[5rem] w-[60%] max-w-[40.6rem] rounded-[3.2rem] bg-[#01A195] px-[2.5rem]  mbl:h-[4rem] mbl:w-[75%] mbl:px-[0.1rem]  mbl:text-[1rem]">
          <Link to="/project">
            <p className="text-[2.2rem] text-[#FFFFFF]  lg:text-[1.5rem]">
              ADICIONAR NOVO PROJETO
            </p>
          </Link>
        </button>
      </article>

      <section className=" mbl:  mt-[10.2rem] flex flex-col gap-[3rem] bg-[#FFFFFF] pb-[10rem] pt-[8rem] xl:px-[2rem]  md:px-[2rem]  mbl:px-[1.5rem]  mbl:pt-[2rem] ">
        <div className="mx-auto flex h-[100%] w-[100%] flex-col items-center  gap-[3rem] ">
          {projects?.map((project: Projects, index) => {
            return (
              <div
                key={index}
                className="mx-auto flex h-[100%] h-[100%] w-[100%] max-w-[120rem] items-center shadow-shadow-#1"
              >
                <div className="h-[19.3rem] w-[1.3rem] rounded-br-[0.8rem] rounded-tr-[0.8rem] bg-[#01A195] md:h-[15rem]  md:w-[1rem]  mbl:h-[15rem] mbl:w-[0.8rem]"></div>
                <div className="w-[100%] pb-[1rem] pl-[11.5rem] pr-[6.7rem] pt-[3rem] font-bold md:pl-[4rem] mbl:pl-[2rem] mbl:pr-[1rem]">
                  <h3 className="mb-[1.2rem] text-[4.8rem] xl:text-[4rem] lg:text-[1.5rem] lg:text-[2.2rem] mbl:text-[1.6rem]">
                    {project?.name}
                  </h3>

                  <p className="mb-[3rem] text-[3.2rem] xl:text-[2.5rem] lg:text-[1.5rem] lg:text-[1.7rem]">
                    {project?.projectScope}
                  </p>

                  <div className="mb-[2rem] flex gap-[2rem]">
                    {languageNames[index]?.map((arra: any) => {
                      return (
                        <Tag label={arra?.data?.title} tagColor={"green"}></Tag>
                      );
                    })}
                  </div>
                  <div className="mb-[3rem] flex items-end justify-end gap-[4rem]">
                    <button className="h-[6rem] w-[60%] max-w-[40.6rem] rounded-[3.2rem] border  border-[#01A195] bg-[#ffffff] px-[1.7rem] xl:h-[5rem] lg:h-[4rem] lg:w-[48%] lg:px-[1rem]  md:h-[3rem]  md:w-[75%] md:max-w-[27rem] mbl:h-[2.5rem] mbl:w-[65%] mbl:max-w-[16rem] ">
                      <p className="text-[2.4rem] text-[#01A195] xl:text-[2rem]   lg:text-[1.5rem] md:text-[1.5rem] mbl:text-[0.9rem] ">
                        CADASTRE-SE NESSE PROJETO
                      </p>
                    </button>
                    <button className=" h-[6rem] w-[60%] max-w-[15.6rem] rounded-[3.2rem] bg-[#01A195] px-[2.5rem] xl:h-[5rem]  lg:h-[4rem]  lg:w-[45%]   lg:px-[1rem] md:h-[3rem] md:w-[30%] md:max-w-[10rem] mbl:h-[2.5rem] mbl:w-[30%] mbl:px-[0.1rem] ">
                      <p className="text-[2.4rem] text-[#FFFFFF] xl:text-[2rem] lg:text-[1.5rem]  lg:text-[1.5rem] md:text-[1.3rem] mbl:text-[1.1rem]">
                        Ver Tudo
                      </p>
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
