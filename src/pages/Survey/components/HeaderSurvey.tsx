
import { Button } from "../../../components/Button";

import { LogoSmall } from "../../../components/LogoSmall";

export const HeaderSurvey = () => {

  return (
    <div className="w-max-[128rem] flex pt-[3.3rem] mx-[8rem] justify-between">
      <LogoSmall />
      <Button className="text-[1.4rem] leading-[1.8rem] tracking-[0.091rem] font-semibold normal-case">
        Salvar e sair
      </Button>
    </div>
  );

};
