"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Card from "./Card";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Slider({ title, games, sort = "DESC" }) {
  const sortedGames = [...games].sort((a, b) => {
    const dateA = new Date(a.released);
    const dateB = new Date(b.released);

    if (sort === "ASC") {
      return dateA - dateB;
    } else if (sort === "DESC") {
      return dateB - dateA;
    }
  });

  return (
    <section id={title} className={`my-4 lg:my-0`}>
      <h2 className={`sr-only`}>{title}</h2>

      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 16,
          },
          // 1024: {
          //   slidesPerView: 4,
          //   slidesPerGroup: 4,
          //   spaceBetween: 16,
          // },
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
        className={`relative !pt-12`}
      >
        {sortedGames.map((game) => {
          return (
            <SwiperSlide key={game.id}>
              <Card game={game} />
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
