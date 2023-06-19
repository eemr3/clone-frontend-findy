import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { useSteps } from "../../../components/ProgressBar/context/useSteps";
import { SelectDBv2 } from "../../../components/forms/SelectDBv2";
import { Survey } from "../../../types/Survey";
import { yupResolver } from "@hookform/resolvers/yup";

export function MarketData() {
  const { prevStep } = useSteps();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    setFocus,
    formState: { errors, isSubmitting }, // Adicione essa propriedade na desestruturação
  } = useForm<Survey>({
    /* resolver: yupResolver(schema), */
    shouldFocusError: true,
    mode: 'onBlur',
    /* defaultValues: {
      name: survey ? survey.name : '',
      genre: survey ? survey.genre : '',
      birth: survey ? survey.birth : undefined,
      residencePlace: survey ? survey.residencePlace : '',
    }, */
  });


  return (
    <form
      className="mx-auto mt-[2rem] mb-[7.692rem] w-[66rem]"
      noValidate
    >
      <Heading type="xxs" className="text-center text-grey-#4">
        Como ficou sabendo da Findy?*
      </Heading>

      <fieldset className="w-full flex flex-col gap-[2rem] mt-4 py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white">

        <SelectDBv2
          options={['Facebook', 'Instagram', 'Twitter', 'Linkedin', 'Tiktok', 'Anúncio Online', 'Indicação de Amigo ou Colega', 'Eventos ou Workshops', 'Outro']}
          label="Como ficou sabendo da Findy?*"
          requiredField
          placeholder="Selecione uma opção"
        />


      </fieldset>

      <nav className="mt-[4rem] flex gap-[4.1rem] justify-center">
        <Button
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          onClick={prevStep}
        >
          Voltar
        </Button>

        <Button
          type="submit"
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          fill
          disabled={isSubmitting}
        >
          Continuar
        </Button>
      </nav>

    </form>
  );
}