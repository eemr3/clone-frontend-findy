import React, { useState } from "react";
import { Heading } from "../../../components/Heading";
import { SelectDBv2 } from "../../../components/forms/SelectDBv2";
import { Button } from "../../../components/Button";
import * as Yup from "yup";

interface ProfissionalAreaProps {
  nextStep: () => void;
}

interface Errors {
  [key: string]: string | undefined;
}

export function ProfissionalArea({ nextStep }: ProfissionalAreaProps) {
  const [situation, setSituation] = useState("");
  const [area, setArea] = useState("");
  const [transition, setTransition] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const schema = Yup.object().shape({
    situation: Yup.string().required("*Campo obrigatório"),
    area: Yup.string().required("*Campo obrigatório"),
    transition: Yup.string().required("*Campo obrigatório"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate({ situation, area, transition }, { abortEarly: false });
      nextStep();
    } catch (err) {
      const validationErrors: Errors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((validationError) => {
          if (validationError.path) {
            validationErrors[validationError.path] = validationError.message;
          }
        });
      }

      setErrors(validationErrors);
    }
  };

  const handleChange = (name: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    if (name === "situation") {
      setSituation(value);
    } else if (name === "area") {
      setArea(value);
    } else if (name === "transition") {
      setTransition(value);
    }
  };

  const getErrorClassName = (name: string) => {
    return errors[name] ? "border border-red" : "";
  };

  return (
    <form className="mx-auto mt-[2rem] flex flex-col items-center h-screen w-[66rem]" noValidate onSubmit={handleSubmit}>
      <h1 className="text-[2.4rem] text-grey-#4 mt-[3.343rem]">Área Profissional</h1>
      <fieldset className="w-full flex flex-col gap-[2rem] mt-4 py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white">
        <SelectDBv2
          options={[
            "Empregado em tempo integral na área de tecnologia",
            "Empregado em tempo integral fora da área de tecnologia",
            "Estudante ou estagiário na área de tecnologia",
            "Desempregado buscando oportunidades na área de tecnologia",
          ]}
          label="Qual sua situação profissão atual?*"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.situation}
          onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, situation: undefined }))}
          onChange={(e) => handleChange("situation", e.target.value)}
          errorClassName={getErrorClassName("situation")}
        />

        <SelectDBv2
          options={[
            "Desenvolvimento Frontend",
            "Desenvolvimento Backend",
            "Desenvolvimento Fullstack",
            "Engenharia de Software",
            "DevOps",
            "Segurança da Informação",
            "Data Science",
            "Engenharia de Dados",
            "Análise de Dados",
            "UX/UI Design",
            "Quality Assurance",
            "Product Management",
            "Agile",
            "Business Inteligence",
            "Outros",
          ]}
          label="Qual é sua área de atuação atual ou mais recente?*"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.area}
          onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, area: undefined }))}
          onChange={(e) => handleChange("area", e.target.value)}
          errorClassName={getErrorClassName("area")}
        />

        <SelectDBv2
          options={[
            "Transição de carreira dentro da área de TI",
            "Transição de carreira para a área de TI",
            "Consolidar os conhecimentos dentro da minha área",
            "Ajudar outras pessoas a aprimorar seus conhecimentos",
          ]}
          label="Qual é o seu objetivo principal?*"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.transition}
          onFocus={() => setErrors((prevErrors) => ({ ...prevErrors, transition: undefined }))}
          onChange={(e) => handleChange("transition", e.target.value)}
          errorClassName={getErrorClassName("transition")}
        />
      </fieldset>

      <nav className="mt-[4rem] flex gap-[4.1rem] justify-center">
        <Button className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case">
          Voltar
        </Button>

        <Button
          type="submit"
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          fill
          onClick={nextStep}
        >
          Continuar
        </Button>
      </nav>
    </form>
  );
}
