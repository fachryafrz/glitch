import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Card from "./Card";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Slider({ title, apiUrl, dates, ordering, genres }) {
  const [data, setData] = useState([]);

  const fetchGames = async () => {
    let params = {
      key: import.meta.env.VITE_API_KEY,
      dates: dates,
      ordering: ordering,
      genres: genres,
    };

    axios
      .get(`https://api.rawg.io/api/${apiUrl}`, {
        params: {
          ...params,
        },
      })
      .then((res) => setData(res.data.results));
  };

  useEffect(() => {
    fetchGames();
  }, []);

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
        className={`relative pt-12`}
      >
        {data.map((game) => {
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
