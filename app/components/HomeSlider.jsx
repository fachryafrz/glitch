"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import data from "../json/homeSlider.json";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeSliderItem from "./HomeSliderItem";

export default function HomeSlider({ games, min, max }) {
  return (
    <section id={`Home Slider`}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[EffectFade, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        effect={`fade`}
        navigation={{
          enabled: true,
          prevEl: "#homePrev",
          nextEl: "#homeNext",
        }}
        allowSlideNext={true}
        allowSlidePrev={true}
        allowTouchMove={true}
      >
        {games.slice(min, max).map((game) => {
          return (
            <SwiperSlide
              key={game.id}
              className={`h-auto flex flex-col lg:!grid lg:!grid-cols-3`}
            >
              <HomeSliderItem game={game} />
            </SwiperSlide>
          );
        })}
        <div
          id={`navigation`}
          className={`text-2xl flex items-center justify-between px-4 gap-4 absolute z-10 inset-x-0 bottom-8 xs:justify-start xs:px-0 xs:right-8 xs:inset-x-auto h-12`}
        >
          <button id={`homePrev`} className={`flex`}>
            <IonIcon icon={arrowBack} />
          </button>
          <button id={`homeNext`} className={`flex`}>
            <IonIcon icon={arrowForward} />
          </button>
        </div>
      </Swiper>
    </section>
  );
}
