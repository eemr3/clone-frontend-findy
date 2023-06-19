import { Button } from '../../../components/Button';

import { LogoSmall } from '../../../components/LogoSmall';

export const HeaderSurvey = () => {
  return (
    <div className="w-max-[128rem] mx-[8rem] flex justify-between pt-[3.3rem]">
      <LogoSmall />
      <Button className="text-[1.4rem] font-semibold normal-case leading-[1.8rem] tracking-[0.091rem]">
        Salvar e sair
      </Button>
    </div>
  );
};
