
import { useState } from "react";
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
   const [projects,setProjects] = useState<any[]>([])

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
    <div className="w-max-[144rem] flex h-[100%] flex-col bg-blue-dark ">
      <HeaderProfile />

      <article className="ml-[15.9rem] mt-[6.414rem] flex flex-col text-grey-#5">
        <Heading type="lg-leading58">
          Bem vindo(a) à Findy, (Nome do Usuário)!
          
        </Heading>

        <Heading type="lg-leading58" className="mt-[8rem]">
          Projetos cadastrados
        </Heading>

        <Text type="md" className="mt-[4rem] mt-[6.4rem] inline-block">
          Visualize os projetos disponíveis na Findy.
        </Text>
        <button className="mt-[5rem] h-[6rem] w-[60%] max-w-[40.6rem] rounded-[3.2rem] bg-[#01A195] px-[2.5rem]">
          <p className="text-[2.4rem] text-[#FFFFFF] ">
            ADICIONAR NOVO PROJETO
          </p>
        </button>
      </article>

      <section className="mt-[10.2rem] flex h-[100%] bg-grey-#5 pt-[8rem] ">
        {projects?.map((project: Projects ) => {

        return (
        <div className="mx-auto flex h-[100%] max-h-[40rem] w-[120rem] items-center bg-[#FFFFFF] shadow-shadow-#1">
          <div className="h-[19.3rem] w-[1.3rem] rounded-br-[0.8rem] rounded-tr-[0.8rem] bg-[#01A195]"></div>
          <div className="w-[100%] pl-[11.5rem] pr-[6.7rem]">
            <h3 className="mb-[7.2rem] text-[4.8rem]">{project?.name}</h3>
            <p className="mb-[2rem] text-[3.2rem]">
            {project?.projectScope}
            </p>
            <div className="flex gap-[2rem] mb-[2rem]">
              <p className="text-[1.5rem] text-[white] bg-[#01A195] px-[1rem] rounded-[1rem] w-[10rem] h-[2rem]">teste</p> 
              </div>
            <div className="flex items-end justify-end gap-[4rem] ">
              <button className="h-[6rem] w-[60%] max-w-[40.6rem] rounded-[3.2rem] border border-[#01A195] bg-[#ffffff] px-[1.7rem]">
                  <p className="text-[2.4rem] text-[#01A195] ">
                  CADASTRE-SE NESSE PROJETO
                </p>
              </button>
              <button className="h-[6rem] w-[60%] max-w-[15.6rem] rounded-[3.2rem] bg-[#01A195] px-[2.5rem]">
                <p className="text-[2.4rem] text-[#FFFFFF] ">Ver Tudo</p>
              </button>
            </div>
          </div>
        </div>
        )
        })}
      </section>
    </div>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

