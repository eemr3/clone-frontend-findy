import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
} from '@phosphor-icons/react';
import React from 'react';

export function FooterLand() {
  return (
    <footer className="mt-[20px] flex w-full items-center bg-blue-dark py-24 text-[14px] text-white">
      <div className="mx-auto flex w-[1359px] items-center justify-around">
        <div className="flex flex-col gap-4">
          <h4>Siga-nos</h4>
          <div className="flex gap-4">
            <LinkedinLogo size={50} />
            <InstagramLogo size={50} />
            <FacebookLogo size={50} />
            <WhatsappLogo size={50} />
            {/* <div className="h-[50px] w-[50px] bg-grey-#2"></div> */}
            {/* <div className="h-[50px] w-[50px] bg-grey-#2"></div> */}
            {/* <div className="h-[50px] w-[50px] bg-grey-#2"></div> */}
            {/* <div className="h-[50px] w-[50px] bg-grey-#2"></div> */}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4>Newsletter</h4>
          <div>
            <input type="text" className="h-[40px] w-[310px]" />
          </div>
        </div>
        <div className="flex h-[69px] w-[194px] flex-col gap-4">
          <h4>Informções</h4>
          <div>
            <p>Endereço</p>
            <p>Telefone</p>
            <p>e-mail</p>
          </div>
        </div>
        <div className="flex h-[69px] w-[194px] flex-col gap-4">
          <h4>Titulo</h4>
          <p>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
            amet
          </p>
        </div>
        <div className="flex h-[69px] w-[194px] flex-col gap-4">
          <h4>Titulo</h4>
          <p>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
            amet
          </p>
        </div>
      </div>
    </footer>
  );
}
