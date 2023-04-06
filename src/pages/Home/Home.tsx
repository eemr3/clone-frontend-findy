import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Navigation, Pagination, History, Autoplay } from 'swiper';
import { AirplaneTilt, CaretRight, Funnel, MagnifyingGlass } from '@phosphor-icons/react';

/* import '../Home/Category.module.scss'; */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles-swiper.css';

import { Button } from "../../components/Button";
import { Input } from '../../components/forms/Input';
import { FrameWithLogoLarge } from "../../components/FrameWithLogoLarge";
import { Header } from "../../components/Header";
import { Heading } from '../../components/Heading';
import { Separator } from '../../components/icons/Separator';
import { Tag } from '../../components/Tag';
import { Text } from '../../components/Text';
import { DesignIcon } from '../../components/icons/DesignIcon';
import { Link } from '../../components/Link';
import { CategoryCard } from '../../components/CategoryCard';
import { CodeIcon } from '../../components/icons/CodeIcon';
import { DatabaseIcon } from '../../components/icons/DatabaseIcon';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/icons/ArrowRightIcon';

export function Home() {

  return (
    <div className="w-max-[144rem] flex flex-col">
      <Header />

      <main>
        <FrameWithLogoLarge
          frameHeight="87rem"
          sectionClassName="w-[125.7rem] ml-[2.9rem] flex"
        >
          <div className="ml-[12.909rem] flex flex-col">
            <Heading
              type="lg"
              className="mt-[9.9rem] w-[52.6rem] tracking-[-0.018em] text-grey-#5"
            >
              Seja um voluntariado tech!
            </Heading>

            <Text
              type="md"
              className="mt-[3.2rem] inline-block w-[45.8rem] text-grey-#5"
            >
              Você é um jovem talento em busca de experiências na área de
              tecnologia? Então conheça a Findy!
            </Text>

            <Button
              fill={true}
              className="mt-[6.4rem] text-[1.683rem] leading-[1.973rem] tracking-[0.136rem] font-bold"
            >
              Veja nossas vagas
            </Button>
          </div>

          <img
            src="/assets/woman.png"
            alt="mulher"
            className="absolute left-[61.215rem]"
          />
        </FrameWithLogoLarge>


        <section className="w-[120rem] h-[39.6rem] rounded-[2.6rem] mt-[-20.9rem] mx-auto relative z-20 flex flex-col items-center bg-grey-#5 shadow-shadow-#3">

          <Heading
            type="sm"
            className="mt-[4rem] text-black"
          >
            Encontre a melhor oportunidade
          </Heading>

          <form action="" className="w-[83.8rem] rounded-[1.642rem] flex gap-[1.6rem] items-center mt-[4rem] px-[2.463rem] py-[1.642rem] bg-white border-[0.088rem] border-black">

            <Input
              className="w-[24.4rem]"
              placeholder="Procure por projeto"
              icon={<MagnifyingGlass size="2.4rem" className="text-green-medium" />}
            />

            <Separator />

            <Input
              className="w-[26.4rem]"
              placeholder="Procure por categorias"
              icon={<Funnel size="2.4rem" className="text-green-medium" />}
            />

            <Button
              fill={true}
              className="text-[1.8rem] leading-[2.109rem] tracking-[0.145rem] font-semibold"
            >
              Encontrar
            </Button>

          </form>

          <div className="mt-[2.458rem] flex gap-[1.2rem]">
            <Tag
              label="ux"
              tagColor="red"
            />

            <Tag
              label="ui"
              tagColor="purple"
            />

            <Tag
              label="Front-end"
              tagColor="yellow"
            />

            <Tag
              label="Back-end"
              tagColor="green"
            />

            <Tag
              label="product owner"
              tagColor="blue"
            />
          </div>

        </section>


        <section className="mt-[8rem] h-[64.3rem] flex flex-col bg-grey-#5">

          <div className="w-[112.187rem] ml-[15.6rem] mt-[4rem] flex justify-between">
            <Heading
              type="sm"
              className="text-grey-#1"
            >
              Categorias
            </Heading>

            <Button>
              VER TUDO
            </Button>
          </div>

          <Text
            type="md"
            className="ml-[15.8rem] mt-[2rem] text-blue-dark"
          >
            Selecione a categoria de seu interesse:
          </Text>


          {/* <div className="w-[125.4rem] ml-[9.3rem] mt-[4rem] pl-[6.5rem] flex gap-[6.4rem]"> */}
          <div className="w-[125.4rem] pl-[9.3rem] mt-[4rem] flex ">

            <div className="swiper-button-prev-unique h-fit my-auto ">
              <ArrowLeftIcon />
            </div>

            {/* <Swiper
              /* className={styles.swiper} /
              modules={[Navigation, Pagination/* , Mousewheel, Keyboard /]}
              /* cssMode /
              navigation
              pagination={
                {
                  clickable: true,
                }
              }
              /* mousewheel
              keyboard /
              /* spaceBetween={50} *
              /
              slidesPerView={2}
              loop
              className="mySwiper"

              /* loopPreventsSliding={false} */
              /* loopedSlides={2} */
              /* centeredSlides */
              /* centeredSlidesBounds /

              onSwiper={(swiper) => {

                console.log('Swiper: ', swiper.realIndex)
              }}
              onSlideChange={(swiper) => console.log('Swiper changed: ', swiper.realIndex)}

            > */}

            <Swiper
              slidesPerView={3}
              spaceBetween={22}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: '.swiper-button-prev-unique',
                nextEl: '.swiper-button-next-unique'
              }}
              modules={[Pagination, Navigation]}
            /* className="mySwiper" */
            >

              <SwiperSlide>
                <CategoryCard
                  cardColor="blue dark"
                  icon={<DesignIcon />}
                  title="Design"
                  linkText="10 vagas abertas"
                />
              </SwiperSlide>


              <SwiperSlide>
                <CategoryCard
                  cardColor="white"
                  icon={<CodeIcon />}
                  title="Front-End"
                  linkText="05 vagas abertas"
                />
              </SwiperSlide>

              <SwiperSlide>
                <CategoryCard
                  cardColor="white"
                  icon={<DatabaseIcon />}
                  title="Back-End"
                  linkText="08 vagas abertas"
                />
              </SwiperSlide>

              <SwiperSlide>
                <CategoryCard
                  cardColor="blue dark"
                  icon={<DesignIcon />}
                  title="Design  #01"
                  linkText="10 vagas abertas"
                />
              </SwiperSlide>


              <SwiperSlide>
                <CategoryCard
                  cardColor="white"
                  icon={<CodeIcon />}
                  title="Front-End  #01"
                  linkText="05 vagas abertas"
                />
              </SwiperSlide>

              <SwiperSlide>
                <CategoryCard
                  cardColor="white"
                  icon={<DatabaseIcon />}
                  title="Back-End #01"
                  linkText="08 vagas abertas"
                />
              </SwiperSlide>


            </Swiper>

            <div className="swiper-button-next-unique">
              <ArrowRightIcon />
            </div>


          </div>



        </section>


        <div className="h-36">

          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>

      </main>


    </div>
  );
}
