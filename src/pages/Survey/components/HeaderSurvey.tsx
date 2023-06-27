import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

import { LogoSmall } from '../../../components/LogoSmall';

export const HeaderSurvey = () => {
  const navigate = useNavigate();

  return (
    <div className="w-max-[128rem] mx-[8rem] pt-[3.3rem]">
      <LogoSmall />
    </div>
  );
};
