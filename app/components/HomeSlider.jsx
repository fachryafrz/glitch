"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import data from "../json/homeSlider.json";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward, star } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { fetchData } from "../lib/fetchData";

export default function HomeSlider({ games, min, max }) {
  return (
    <section id={`Home Slider`}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[EffectFade, Navigation, Autoplay, Keyboard]}
        keyboard={true}
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
        className={`max-w-md lg:max-w-7xl`}
      >
        {games.slice(min, max).map((game) => {
          return (
            <SwiperSlide key={game.id} className={`!h-auto`}>
              <HomeGame game={game} />
            </SwiperSlide>
          );
        })}
        <div
          id={`navigation`}
          className={`text-2xl flex items-center justify-between px-4 gap-4 absolute z-10 inset-x-0 bottom-4 sm:bottom-8 xs:justify-start xs:px-0 xs:right-8 xs:inset-x-auto h-12`}
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

function HomeGame({ game }) {
  const [publisher, setPublisher] = useState();

  const publisherID = game.involved_companies.find(
    (company) => company.publisher
  ).company;

  useEffect(() => {
    const fetchCompany = async () => {
      await fetchData({
        path: `/companies`,
        fields: `
          fields name, logo.*;
          where id = ${publisherID};
        `,
      }).then((res) => {
        setPublisher(res[0].name);
      });
    };

    fetchCompany();
  }, [game]);

  return (
    <article className={`h-full flex flex-col lg:flex-row`}>
      <figure className={`lg:w-[70%]`}>
        {/* <img
          src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`}
          alt={game.name}
          className={`aspect-cover object-top`}
        /> */}
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_original/${game.artworks[0].image_id}.jpg`}
          alt={game.name}
          className={`aspect-video`}
        />
      </figure>

      <div
        className={`relative sm:h-[300px] lg:h-full p-8 pt-12 pb-20 bg-primary-secondary flex flex-col gap-4 text-center lg:text-start lg:w-[30%]`}
      >
        <span
          className={`opacity-50 bg-neutral-700 text-sm w-fit p-2 absolute top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-8 whitespace-nowrap`}
        >
          {publisher}
        </span>

        <h2
          title={game.name}
          className={`text-2xl lg:text-3xl font-bold line-clamp-2 !leading-snug`}
          style={{ textWrap: `balance` }}
        >
          {game.name}
        </h2>

        <ul
          className={`flex sm:flex-wrap items-center justify-center lg:justify-start gap-1 text-xs sm:text-sm`}
        >
          <li
            className={`p-1 px-3 bg-neutral-600 bg-opacity-50 rounded-full flex items-center gap-1`}
          >
            <IonIcon icon={star} className={`text-primary-yellow `} />
            <span className={`font-medium`}>
              {(game.rating / 10).toFixed(1)}
            </span>
          </li>
          <li
            className={`p-1 px-3 bg-neutral-600 bg-opacity-50 rounded-full flex items-center gap-1`}
          >
            <span className={`font-medium`}>
              {new Date(game.first_release_date * 1000).getFullYear()}
            </span>
          </li>
          <li
            className={`p-1 px-3 bg-neutral-600 bg-opacity-50 rounded-full flex items-center gap-1`}
          >
            <span className={`font-medium line-clamp-1 text-left`}>
              {game.genres[0].name}
            </span>
          </li>
        </ul>

        <p className={`hidden sm:line-clamp-3 xl:line-clamp-5 text-left opacity-50`}>
          {game.summary}
        </p>

        <Link
          href={`/games/${game.slug}`}
          className={`p-3 px-8 bg-white bg-opacity-10 rounded hocus:bg-opacity-20 text-center absolute bottom-4 sm:bottom-8`}
        >
          View details
        </Link>
      </div>
    </article>
  );
}
