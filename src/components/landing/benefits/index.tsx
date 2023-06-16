import { Link } from 'react-router-dom';
import { Benefit } from './Benefit';

export function Benefits() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-16">
      <div className="ml-[135px] mt-[133px] flex w-full text-left">
        <h3 className="h-[138px] w-[600px] text-[40px] font-bold text-white">
          A Findy te ajuda com o seu desenvolvimento.
        </h3>
      </div>
      <div className="w-full px-7">
        <Benefit text="Através de um painel intuitivo e interativo, você poderá visualizar um radar das suas habilidades para monitorar sua evolução da jornada profissional." />
        <Benefit
          reverse={true}
          text="Através de um painel intuitivo e interativo, você poderá visualizar um radar das suas habilidades para monitorar sua evolução da jornada profissional."
        />
        <Benefit text="Através de um painel intuitivo e interativo, você poderá visualizar um radar das suas habilidades para monitorar sua evolução da jornada profissional." />
      </div>
      <div className="my-[133px]">
        <Link
          to="/cadastro"
          className="rounded-[31px] bg-green-medium px-56 py-8 text-[18px] font-semibold uppercase leading-[23.4px] text-white"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
