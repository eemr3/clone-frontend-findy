import { Link } from 'react-router-dom';

export default function Highlight() {
  return (
    <section className="mx-auto mb-[70px] mt-[70px] flex w-full flex-col bg-blue-dark py-8">
      <div className="flex max-w-[1356px] justify-between 2xl:mx-[40px]">
        <div className="flex h-[542px] flex-col justify-between">
          <div className="h-[240px] w-[660px] text-[48px] font-bold leading-[52.8px] text-white">
            Quer ter clareza e organização de como desenvolver a sua carreira tech?
          </div>
          <div className="h-[146px] w-[660px] text-[32px] font-semibold leading-[36px] text-white">
            A Findy é para você que está dando o start ou em transição de carreira. Somos
            a maneira mais fácil de descobrir e aprimorar seu desenvolvimento
            profissional.
          </div>
          <div className="ml-[100px] mt-[140px]">
            <Link
              to="/cadastro"
              className="rounded-[31px] bg-green-medium px-52 py-8 text-[14px] font-semibold uppercase text-white"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
        <div className="h-[542px] w-[543px] bg-white"></div>
      </div>
    </section>
  );
}
