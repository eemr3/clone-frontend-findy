import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './Button';
import { Logo } from './Logo';
import { LogoSmall } from './LogoSmall';

export const Header = () => {
  return (
    <div
      className="mb-[2rem] ml-[3.2rem] flex flex-row justify-between gap-[2.55rem] 
    px-[3.2rem] pt-[3.48rem] mbl:flex-col mbl:px-[0]"
    >
      <LogoSmall />
      <Button url="/">Voltar</Button>
    </div>
  );
};
