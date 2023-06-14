import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button } from "./Button";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="flex justify-between px-[3.2rem] ml-[3.2rem] pt-[3.48rem] mbl:flex-col flex-row gap-[2.55rem] mb-[2rem] mbl:px-[0]">
      <Logo />
      <Button>
        Voltar
      </Button>
    </div>
  )
};
