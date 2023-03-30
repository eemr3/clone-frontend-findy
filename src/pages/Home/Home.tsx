import { Button } from "../../components/Button";
import { FrameWithLogoLarge } from "../../components/FrameWithLogoLarge";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <div className="w-max-[144rem] flex flex-col">
      <Header />

      <FrameWithLogoLarge
        frameHeight="h-[87rem]"
        sectionClassName="w-[125.7rem] ml-[2.9rem] flex"
      >
        <div className="ml-[12.909rem] flex flex-col">
          <h1 className="mt-[9.9rem] w-[52.6rem] text-[6.4rem] font-bold leading-[7.25rem] tracking-[-0.018em] text-grey-#5">
            Seja um voluntariado tech!
          </h1>

          <span className="mt-[3.2rem] inline-block w-[45.8rem] text-[2.4rem] font-medium text-grey-#5">
            Você é um jovem talento em busca de experiências na área de
            tecnologia? Então conheça a Findy!
          </span>

          <Button fill={true} className="mt-[6.4rem]">
            Veja nossas vagas
          </Button>
        </div>

        <img
          src="/assets/woman.png"
          alt="mulher"
          className="absolute left-[61.215rem]"
        />
      </FrameWithLogoLarge>

      <div className="mt-[26.9rem] h-60 bg-grey-#5">
        <h1 className="ml-40 mt-4 text-5xl font-bold">Categoria</h1>
      </div>
    </div>
  );
}
