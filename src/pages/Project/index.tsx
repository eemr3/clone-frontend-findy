import { yupResolver } from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { HeaderProfile } from '../../components/HeaderProfile';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Checkbox } from '../../components/forms/Checkbox';
import { InputDB } from '../../components/forms/InputDB';
import { SelectDB } from '../../components/forms/SelectDB';
import { TextErrorMessage } from '../../components/forms/TextErrorMessage';
import { CodeIcon } from '../../components/icons/CodeIcon';
import { PencilIcon } from '../../components/icons/PencilIcon';
import { SocialMediaIcon } from '../../components/icons/SocialMediaIcon';
import {
  formProject,
  getCandidateUser,
  getLanguages,
  getPositions,
} from '../../services/api';
import { AuthContext } from '../../context/auth';
interface FormValues {
  name: string;
  urlTeamSelection: string;
  projectScope: string;
  language: number[];
  data_inicio: string;
  responsible: string;
  contactResponsible: string;
  urlLinkediResponsible: string;
  contactLeaders: string;
  findyHelp: string;
  professional: string[];
  others: string[];
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Nome Obrigatorio'),
    urlTeamSelection: yup.string().required('Link Obrigatorio'),
    projectScope: yup
      .string()
      .required('Escopo Obrigatorio') /* .required("Escopo do projeto obrigatório") */,
    language: yup
      .array(yup.number())
      .required('Obrigatório Pelos menos 1 liguagem ou ferramenta'),
    data_inicio: yup.string(),
    responsible: yup.string().required('Responsavel Obrigatorio'),
    contactResponsible: yup.string().required('Contato Obrigatorio'),
    urlLinkediResponsible: yup.string().url('URL do LinkedIn inválida'),
    contactLeaders: yup.string(),
    findyHelp: yup.string(),
    professional: yup.array(yup.string()).min(1, 'Precisa escolher pelo menos um cargo.'),
    /* others: yup.string().when("professional", {
        is: (area: string[]) => !!area && area.indexOf("Outro") > -1,
        then: (schema) => schema.required("Cargo obrigatório"),
      })  */
  })
  .required();

interface Positions {
  data: [id?: number, title?: string];
}

export function Project() {
  const [positions, setPositions] = useState<any>([]);
  const [languages, setLanguages] = useState<number[]>([]);
  const [candidateUser, setCandidateUser] = useState<any>();
  const [activeSubmit, setActiveSubmit] = useState(false);
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues: {
      responsible: candidateUser ? candidateUser.name : '',
      contactResponsible: candidateUser ? candidateUser.email : '',
      language: [],
    },
  });

  const handleUpdateProject: SubmitHandler<FormValues> = async (values, event) => {
    event?.preventDefault();
    setActiveSubmit(true);
    console.log(values);

    try {
      const { ...newValues } = values;

      const body = {
        ...newValues,
      };
      let result = await formProject(body);
      if (result?.status === 201) {
        navigate('/project_registered');
      }
    } catch (error) {}

    setActiveSubmit(false);
  };
  const [selectedLanguageIds, setSelectedLanguageIds] = useState<any>([]);
  const [selectedLanguageNames, setSelectedLanguageNames] = useState<string[]>([]);
  console.log(selectedLanguageIds);

  const handleLanguageChange = (event: any) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    if (!selectedLanguageIds.includes(parseInt(selectedId))) {
      setSelectedLanguageIds([...selectedLanguageIds, parseInt(selectedId)]);
    }

    if (!selectedLanguageNames.includes(selectedName)) {
      setSelectedLanguageNames([...selectedLanguageNames, selectedName]);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setSelectedLanguageIds(
      selectedLanguageIds.filter((_id: number, i: number) => i !== index),
    );
    setSelectedLanguageNames(
      selectedLanguageNames.filter((_name: string, i: number) => i !== index),
    );
  };

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      const { sub }: any = jwt_decode(token);
      const user = await getCandidateUser(sub);
      const pos = await getPositions();
      const lan = await getLanguages();

      setCandidateUser(user.data);
      setPositions(pos.data);
      setLanguages(lan?.data);
    }

    fetchData();
  }, [selectedLanguageNames]);

  useEffect(() => {
    if (!candidateUser) return;
    setValue('responsible', candidateUser?.name);
    setValue('contactResponsible', candidateUser?.email);
    setValue('urlLinkediResponsible', candidateUser?.profile?.urlLinkedin);
    setValue('language', selectedLanguageIds);
  }, [candidateUser, selectedLanguageIds]);

  const dataAtual = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="w-max-[144rem] flex flex-col overflow-x-hidden bg-blue-dark ">
      <HeaderProfile showJustify={false} />

      <article className="ml-[15.9rem] mt-[6.414rem] overflow-x-hidden text-grey-#5 lg:ml-[4rem] mbl:ml-[2rem]">
        <Heading type="lg-leading58" className=" mbl:text-[4rem]">
          Novo projeto
        </Heading>

        <Text type="md" className="mt-[6.4rem] inline-block mbl:text-[2rem]">
          Preencha o formulário abaixo com todas as informações relevantes acerca do
          projeto.
          <br />
          <br />O formulário será submetido aos administradores da Findy, para aprovação.
          O prazo para devolução é de XX dias.
        </Text>
      </article>

      <section className="mt-[10.2rem] overflow-x-hidden bg-grey-#5 xl:px-[3rem] mbl:px-[1rem]">
        <div className="mx-auto mb-[16rem] mt-[7.4rem] w-[100%] max-w-[112.4rem]">
          <div className="grid grid-cols-2 lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-y-[6.469rem] mbl:gap-y-[4rem]">
            <InputDB
              icon={<PencilIcon className={'mbl:max-w-[2rem] '} />}
              {...register('name')}
              label="Nome do Projeto"
              placeholder="Nome"
              fieldSetClassName={'even:ml-auto'}
              error={errors ? errors.name?.message : ''}
            />

            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem] '} />}
              label="Link para seleção da equipe"
              {...register('urlTeamSelection')}
              placeholder="Link"
              fieldSetClassName={'ml-auto'}
              error={errors ? errors.urlTeamSelection?.message : ''}
            />
          </div>
          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem] ">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Escopo"
            >
              Escopo do Projeto:{' '}
            </label>
            <div className=" mt-[3.2rem]flex h-[22.2rem] w-[100%] max-w-[112.4rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              <textarea
                {...register('projectScope')}
                className=" h-[100%] w-[100%]  resize-none p-[0.6rem]  text-[2.2rem] outline-none lg:text-[1.8rem] mbl:text-[1rem]"
              />
            </div>
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors ? errors.projectScope?.message : ''}{' '}
            </span>
          </div>

          <div className="grid h-[100%] grid-cols-2 flex-col items-start justify-center gap-y-[6.469rem] overflow-x-hidden  overflow-y-hidden  sm:w-[32rem] sm:max-w-[100%]  lg:flex  mbl:max-w-[100%] mbl:gap-y-[4rem]  ">
            <SelectDB
              icon={<CodeIcon className={'mbl:max-w-[2rem] '} />}
              label="Selecione as linguagens de programação"
              placeholder="Selecione as linguagens"
              fieldSetClassName={'even:ml-auto'}
              options={languages.map((language: any) => ({
                value: language?.id,
                label: language?.title,
                name: language?.title,
              }))}
              onChange={handleLanguageChange}
              error={errors ? errors.language?.message : ''}
            />

            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem] '} />}
              label="Data do inicio do projeto"
              placeholder="Data"
              fieldSetClassName={'even:ml-auto  even:lg:ml-[0]'}
              value={dataAtual}
              disabled
            />
          </div>

          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem]">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Deixe sua mensagem"
            >
              Linguagens{' '}
            </label>
            <div
              className="mt-[3.2rem]flex flex h-[22.2rem] w-[100%] max-w-[112.4rem] flex-wrap gap-[1rem] 
             rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem] md:h-auto"
            >
              {selectedLanguageNames.map((lang: string, index: number) => (
                <div
                  key={selectedLanguageIds[index]}
                  className="selected-language flex h-[3rem] items-center justify-between 
                  bg-[lightgray] px-[1rem] pl-[1rem]"
                  data-index={index}
                  {...register('language')}
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

            {!!errors.professional?.message && (
              <TextErrorMessage
                errorMessage={errors.professional?.message}
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
                  {...register('professional')}
                />
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-2 flex-col items-start justify-center gap-y-[6.469rem] lg:flex mbl:gap-y-[4rem]">
            <InputDB
              icon={<PencilIcon className={'mbl:max-w-[2rem] '} />}
              label="Insira o nome da pessoa responsável pelo projeto"
              placeholder="Nome"
              fieldSetClassName={'even:ml-auto  even:lg:ml-[0]'}
              error={errors ? errors.responsible?.message : ''}
              {...register('responsible')}
              fieldSetBG={`${candidateUser?.name ? 'bg-[#d3d3d3!important]' : ''}`}
            />

            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem]'} />}
              label="Insira o contato da pessoa responsável"
              placeholder="Contato"
              fieldSetClassName={'even:ml-auto  even:lg:ml-[0]'}
              {...register('contactResponsible')}
              error={errors ? errors.contactResponsible?.message : ''}
              fieldSetBG={`${
                candidateUser?.email != undefined ? 'bg-[#d3d3d3!important]' : ''
              }`}
            />
            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem] '} />}
              label="Linkedin do Responsável"
              placeholder="LinkedIn"
              fieldSetClassName={'even:ml-auto  even:lg:ml-[0]'}
              {...register('urlLinkediResponsible')}
              error={errors ? errors.urlLinkediResponsible?.message : ''}
              fieldSetBG={`${
                candidateUser?.profile?.urlLinkedin != undefined
                  ? 'bg-[#d3d3d3!important]'
                  : ''
              }`}
            />
            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem] '} />}
              label="Contato de outros responsaveis"
              placeholder="LinkedIn"
              fieldSetClassName={'even:ml-auto  even:lg:ml-[0]'}
              {...register('contactLeaders')}
              error={errors ? errors.urlLinkediResponsible?.message : ''}
            />
          </div>

          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem]">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Deixe sua mensagem"
            >
              Como a Findy pode apoiar o seu projeto?{' '}
            </label>
            <div className=" mt-[3.2rem]flex h-[22.2rem] w-[100%] max-w-[112.4rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              <textarea
                {...register('findyHelp')}
                className="h-[100%]  w-[100%] resize-none p-[0.6rem] outline-none"
              />
            </div>
          </div>

          <button className="mt-[6.6rem] h-[6rem] w-[60%] max-w-[32.9rem] rounded-[3.2rem] bg-[#01A195]">
            <p
              className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2rem] "
              onClick={handleSubmit(handleUpdateProject)}
            >
              SUBMETER PROJETO
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}
