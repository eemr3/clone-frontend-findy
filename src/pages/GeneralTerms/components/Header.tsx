import { Button } from '../../../components/Button';

import { LogoSmall } from '../../../components/LogoSmall';

export const HeaderTerms = () => {
  return (
    <div className="w-max-[128rem] mx-[8rem] flex justify-between">
      <LogoSmall />
      <Button className="text-[1.4rem] font-semibold normal-case leading-[1.8rem] tracking-[0.091rem]">
        Voltar
      </Button>
    </div>
  );
};
