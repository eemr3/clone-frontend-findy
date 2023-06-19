import React, { useState } from "react";
import { Heading } from "../../../components/Heading";
import { SelectDBv2 } from "../../../components/forms/SelectDBv2";
import { Button } from "../../../components/Button";
import * as Yup from "yup";
import { Text } from "../../../components/Text";

interface MarketDataProps {
  nextStep: () => void;
}

interface Errors {
  findySource?: string;
}

export function MarketData({ nextStep }: MarketDataProps) {
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [selectedOption, setSelectedOption] = useState("");

  const validationSchema = Yup.object().shape({
    findySource: Yup.string().required("*Campo obrigatório"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveSubmit(true);
    setErrors({});

    try {
      await validationSchema.validate({ findySource: selectedOption }, { abortEarly: false });
      nextStep(); // Avança para o próximo passo se uma opção foi selecionada
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Errors = {};
        err.inner.forEach((error) => {
          if (error.path === "findySource") {
            newErrors.findySource = error.message;
          }
        });
        setErrors(newErrors);
      }
      setActiveSubmit(false);
    }
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setErrors({});
  };

  return (
    <form className="mx-auto mt-[2rem] h-screen w-[66rem]" noValidate onSubmit={handleSubmit}>
      <Heading type="xxs" className="text-center text-grey-#4 mb-[1rem]">
        Como ficou sabendo da Findy?*
      </Heading>

      <fieldset
        className={`w-full flex flex-col py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white ${
          errors.findySource ? "border border-red" : ""
        }`}
      >
        <SelectDBv2
          options={[
            { value: "Facebook", label: "Facebook" },
            { value: "Instagram", label: "Instagram" },
            { value: "Twitter", label: "Twitter" },
            { value: "Linkedin", label: "Linkedin" },
            { value: "Tiktok", label: "Tiktok" },
            { value: "Anúncio Online", label: "Anúncio Online" },
            { value: "Indicação de Amigo ou Colega", label: "Indicação de Amigo ou Colega" },
            { value: "Eventos ou Workshops", label: "Eventos ou Workshops" },
            { value: "Outro", label: "Outro" },
          ]}
          label="Como ficou sabendo da Findy?*"
          requiredField
          placeholder="Selecione uma opção"
          errorClassName={errors.findySource ? "border border-red" : ""}
          value={selectedOption}
          className={errors.findySource ? "border-red" : ""}
          onClickOption={handleSelectOption}
        />

        {errors.findySource && (
          <Text type="sm" className="text-red mt-[-1.5rem]">
            {errors.findySource}
          </Text>
        )}
      </fieldset>

      <nav className="mt-[4rem] flex gap-[4.1rem] justify-center">
        <Button className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case">
          Voltar
        </Button>

        <Button
          className={`w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case ${
            selectedOption ? "text-green-medium" : ""
          }`}
          fill
          disabled={activeSubmit}
          type="submit"
        >
          Continuar
        </Button>
      </nav>
    </form>
  );
}
