import React from 'react';

export default function Highlight() {
  return (
    <section className="mx-auto mb-[70px] mt-[70px] flex w-full flex-col py-8">
      <div className="flex max-w-[1356px] justify-between 2xl:mx-[40px]">
        <div>
          <div className="h-[240px] w-[660px] text-[48px] font-bold leading-[52.8px] text-white">
            Quer ter clareza e organização de como desenvolver a sua carreira tech?
          </div>
          <div className="h-[146px] w-[660px] text-[32px] font-semibold leading-[36px] text-white">
            A Findy é para você que está dando o start ou em transição de carreira. Somos
            a maneira mais fácil de descobrir e aprimorar seu desenvolvimento
            profissional.
          </div>
        </div>
        <div className="h-[542px] w-[543px] bg-white"></div>
      </div>
    </section>
  );
}
