import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

import { LogoSmall } from '../../../components/LogoSmall';

export const HeaderSurvey = () => {
  const navigate = useNavigate();

  return (
    <div className="w-max-[128rem] mx-[8rem] flex justify-between pt-[3.3rem]">
      <LogoSmall />
      <Button
        className="text-[1.4rem] font-semibold normal-case leading-[1.8rem] tracking-[0.091rem]"
        onClick={() => navigate('/')}
      >
        Salvar e sair
      </Button>
    </div>
  );
};
