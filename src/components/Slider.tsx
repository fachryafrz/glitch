import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Card from "./Card";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";

type Game = {
  title: string;
  cover: string;
  company: string;
};

type Slider = {
  title: string;
  games: Game[];
  min: number;
  max: number;
};

export default function Slider({ title, games, min, max }: Slider) {
  return (
    <section id={title}>
      <h2 className={`sr-only`}>{title}</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        modules={[Navigation]}
        effect={`fade`}
        navigation={{
          enabled: true,
          prevEl: "#sliderPrev",
          nextEl: "#sliderNext",
        }}
        allowSlideNext={true}
        allowSlidePrev={true}
        allowTouchMove={true}
        className={`relative pt-12`}
      >
        {games.slice(min, max).map((item: Game, i: number) => {
          return (
            <SwiperSlide key={i}>
              <Card game={item} />
            </SwiperSlide>
          );
        })}

        <div
          className={`absolute inset-x-0 top-0 flex items-center justify-between z-10 pointer-events-none [&_*]:pointer-events-auto text-2xl`}
        >
          <span className={`font-bold`}>{title}</span>

          <div className={`flex items-center gap-2`}>
            <button id={`sliderPrev`} className={`flex`}>
              <IonIcon icon={arrowBack} />
            </button>
            <button id={`sliderNext`} className={`flex`}>
              <IonIcon icon={arrowForward} />
            </button>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
