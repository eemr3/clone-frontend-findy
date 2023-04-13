import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Checkbox } from "../../components/forms/Checkbox";
import { InputDB } from "../../components/forms/InputDB";
import { SelectDB } from "../../components/forms/SelectDB";
import { TextErrorMessage } from "../../components/forms/TextErrorMessage";
import { CodeIcon } from "../../components/icons/CodeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { formProject, getLanguages, getPositions } from "../../services/api";

interface FormValues {
  nome: string;
  link_selecao_equipe: string;
  escopo_project: string;
  ferramentas: string;
  data_inicio: string;
  responsavel_project: string;
  contato_responsavel: string;
  linkedin_responsavel: string;
  contato_outros_responsaveis: string;
  ajuda_findy: string;
  areaAtuacao: string[];
  areaOutroCargo: string;
}

const schema = yup
  .object()
  .shape({
    nome: yup.string().required("Nome Obrigatorio"),
    link_selecao_equipe: yup.string().required("Link Obrigatorio"),
    escopo_project: yup
      .string()
      .required(
        "Escopo Obrigatorio"
      ) /* .required("Escopo do projeto obrigatório") */,
    ferramentas: yup
      .string()
      .required("Obrigatório Pelos menos 1 liguagem ou ferramenta"),
    data_inicio: yup.string(),
    responsavel_project: yup.string().required("Responsavel Obrigatorio"),
    contato_responsavel: yup.string().required("Contato Obrigatorio"),
    linkedin_responsavel: yup.string().url("URL do LinkedIn inválida"),
    contato_outros_responsaveis: yup.string(),
    ajuda_findy: yup.string(),
    areaAtuacao: yup
      .array(yup.string())
      .min(1, "Precisa escolher pelo menos uma área de atuação."),
      areaOutroCargo: yup.string().when("areaAtuacao", {
        is: (area: string[]) => !!area && area.indexOf("Outro") > -1,
        then: (schema) => schema.required("Cargo obrigatório"),
      })
  })
  .required();

interface Positions {
  data: [id?: number, title?: string];
}

export function Project() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  /*   const [ferramentas, setFerramentas] = useState<string[]>([]); */
  const [positions, setPositions] = useState<any>([]);
  const [languages, setLanguages] = useState<any>([]);
  const {
    register,
    handleSubmit,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log("hello");

    const checkedIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );
    console.log(checkedIds);
    if (data != null) {
      const body = {
        name: data.nome,
        projectScope: "hello",
        urlTeamSelection: data.link_selecao_equipe,
        responsible: data.responsavel_project,
        contactResponsible: data.contato_responsavel,
        urlLinkediResponsible: data.linkedin_responsavel,
        contactLeaders: data.contato_outros_responsaveis,
        language: selectedLanguageIds,
        professional: checkedIds,
        //"others": ferramentas,
        findyHelp: data.ajuda_findy,
      };
      let result = await formProject(body);
      console.log(result);
    }
  };
  const [selectedLanguageIds, setSelectedLanguageIds] = useState<any>([]);
  const [selectedLanguageNames, setSelectedLanguageNames] = useState<any>([]);

  const handleLanguageChange = (event: any) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    if (!selectedLanguageIds.includes(selectedId)) {
      setSelectedLanguageIds([...selectedLanguageIds, selectedId]);
      setSelectedLanguageNames([...selectedLanguageNames, selectedName]);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setSelectedLanguageIds(
      selectedLanguageIds.filter((_id: string, i: number) => i !== index)
    );
    setSelectedLanguageNames(
      selectedLanguageNames.filter((_name: string, i: number) => i !== index)
    );
  };

  useEffect(() => {
    async function fetchData() {
      const pos = await getPositions();
      const lan = await getLanguages();
      setPositions(pos.data);
      setLanguages(lan.data);
    }
    fetchData();
  }, [selectedLanguageNames]);

  return (
    <div className="w-max-[144rem] flex flex-col overflow-x-hidden bg-blue-dark ">
      <Header showJustify={false} />

      <article className="ml-[15.9rem] mt-[6.414rem] overflow-x-hidden text-grey-#5 lg:ml-[4rem] mbl:ml-[2rem]">
        <Heading type="lg-leading58" className=" mbl:text-[4rem]">
          Novo projeto
        </Heading>

        <Text type="md" className="mt-[6.4rem] inline-block mbl:text-[2rem]">
          Preencha o formulário abaixo com todas as informações relevantes
          acerca do projeto.
          <br />
          <br />O formulário será submetido aos administradores da Findy, para
          aprovação. O prazo para devolução é de XX dias.
        </Text>
      </article>

      <section className="mt-[10.2rem] overflow-x-hidden bg-grey-#5 xl:px-[3rem] mbl:px-[1rem]">
        <div className="mx-auto mb-[16rem] mt-[7.4rem] w-[100%] max-w-[112.4rem]">
          <div className="grid grid-cols-2 lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-y-[6.469rem]">
            <InputDB
              icon={<PencilIcon />}
              {...register("nome")}
              label="Nome do Projeto"
              placeholder="Nome"
              fieldSetClassName={"even:ml-auto"}
              error={errors ? errors.nome?.message : ""}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Link para seleção da equipe"
              {...register("link_selecao_equipe")}
              placeholder="Link"
              fieldSetClassName={"ml-auto"}
              error={errors ? errors.link_selecao_equipe?.message : ""}
            />
          </div>
          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem] ">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Escopo"
            >
              Escopo do Projeto:{" "}
            </label>
            <div className=" mt-[3.2rem]flex h-[22.2rem] w-[100%] max-w-[112.4rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              <textarea
                {...register("escopo_project")}
                className="h-[100%]  w-[100%] resize-none p-[0.6rem] outline-none"
              />
            </div>
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors ? errors.escopo_project?.message : ""}{" "}
            </span>
          </div>

          <div className="grid h-[100%] grid-cols-2 flex-col items-start justify-center gap-y-[6.469rem] overflow-x-hidden  overflow-y-hidden  lg:flex sm:w-[32rem]  sm:max-w-[100%]  mbl:max-w-[100%]  ">
            <SelectDB
              icon={<CodeIcon />}
              label="Selecione as linguagens de programação"
              placeholder="Selecione as linguagens"
              fieldSetClassName={"even:ml-auto"}
              {...register("ferramentas")}
              options={languages.map((language: any) => ({
                value: language?.id,
                label: language?.title,
                name: language?.title,
              }))}
              onChange={handleLanguageChange}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Data do inicio do projeto"
              placeholder="Data"
              fieldSetClassName={"even:ml-auto  even:lg:ml-[0]"}
            />
          </div>

          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem]">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Deixe sua mensagem"
            >
              Linguagens{" "}
            </label>
            <div className="mt-[3.2rem]flex flex h-[22.2rem] w-[100%] max-w-[112.4rem] gap-[1rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              {selectedLanguageNames.map((lang: string, index: number) => (
                <div
                  key={selectedLanguageIds[index]}
                  className="selected-language flex h-[3rem] items-center justify-between bg-[lightgray] px-[1rem] pl-[1rem]"
                  data-index={index}
                >
                  <p className="mr-[2rem] text-[2rem]">{lang}</p>
                  <button
                    className="text-[2rem] font-bold"
                    onClick={() => handleRemoveLanguage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <fieldset className="max-[80%] mb-[6.8rem] mt-[8rem] ">
            <legend className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1">
              Quais cargos serão oferecidos à equipe do projeto?
            </legend>

            {!!errors.areaAtuacao?.message && (
              <TextErrorMessage
                errorMessage={errors.areaAtuacao?.message}
                className="mt-[1.2rem] inline-block"
              />
            )}

            <div className="mt-[4rem] grid  grid-cols-2 gap-y-[2.5rem] md:grid-cols-1 mbl:mt-[3.8rem] mbl:w-[86%]">
              {positions?.map((occupation: any) => (
                <Checkbox
                  key={occupation.id}
                  id={String(occupation.id)}
                  label={occupation.title}
                  value={occupation.title}
                  {...register("areaAtuacao")}
                />
              ))}
            </div>
            <div className="mt-[2.5rem] flex items-start items-center items-baseline gap-16 mbl:flex-col ">
              <Checkbox name="area" id="Outro" label="Outro: " />

              <InputDB placeholder="Cargo" fieldSetClassName="h-[6rem]" />
            </div>
          </fieldset>
          
          <div className="grid grid-cols-2 flex-col items-start justify-center gap-y-[6.469rem] lg:flex ">
            <InputDB
              icon={<PencilIcon />}
              label="Insira o nome da pessoa responsável pelo projeto"
              placeholder="Nome"
              {...register("responsavel_project")}
              fieldSetClassName={"even:ml-auto  even:lg:ml-[0]"}
              error={errors ? errors.responsavel_project?.message : ""}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o contato da pessoa responsável"
              placeholder="Contato"
              fieldSetClassName={"even:ml-auto  even:lg:ml-[0]"}
              {...register("contato_responsavel")}
              error={errors ? errors.contato_responsavel?.message : ""}
            />
            <InputDB
              icon={<SocialMediaIcon />}
              label="Linkedin do Responsável"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto  even:lg:ml-[0]"}
              {...register("linkedin_responsavel")}
              error={errors ? errors.linkedin_responsavel?.message : ""}
            />
            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira os outros contatos dos responsáveis"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto  even:lg:ml-[0]"}
              {...register("contato_outros_responsaveis")}
            />
          </div>

          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem]">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Deixe sua mensagem"
            >
              Como a Findy pode apoiar o seu projeto?{" "}
            </label>
            <div className=" mt-[3.2rem]flex h-[22.2rem] w-[100%] max-w-[112.4rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              <textarea
                {...register("ajuda_findy")}
                className="h-[100%]  w-[100%] resize-none p-[0.6rem] outline-none"
              />
            </div>
          </div>

          <button className="mt-[6.6rem] h-[6rem] w-[60%] max-w-[32.9rem] rounded-[3.2rem] bg-[#01A195]">
            <p
              className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2rem] "
              onClick={handleSubmit(onSubmit)}
            >
              SUBMETER PROJETO
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}
