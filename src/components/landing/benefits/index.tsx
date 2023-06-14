import React from 'react';
import Container from '../Container';
import { Benefit } from './Benefit';

export default function Benefits() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-16">
      <div
        className="w-full px-7 
                xl:w-[1200px] xl:px-0"
      >
        <Benefit text="Através de um painel intuitivo e interativo, você poderá visualizar um radar das suas habilidades para monitorar sua evolução da jornada profissional." />
        <Benefit
          reverse={true}
          text="Através de um painel intuitivo e interativo, você poderá visualizar um radar das suas habilidades para monitorar sua evolução da jornada profissional."
        />
      </div>
    </div>
  );
}
