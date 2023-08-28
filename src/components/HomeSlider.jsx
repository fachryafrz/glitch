// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import data from "../json/homeSlider.json";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeSliderItem from "./HomeSliderItem";

export default function HomeSlider({ apiUrl, dates, ordering, min, max }) {
  const [data, setData] = useState([]);

  const fetchGames = async () => {
    let params = {
      key: "7f7cb6556d15408eaeeb7b6e52579929",
      dates: dates,
      ordering: ordering,
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
    <section id={`Home Slider`}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        modules={[EffectFade, Navigation]}
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
        {data.slice(min, max).map((game) => {
          return (
            <SwiperSlide
              key={game.id}
              className={`h-auto flex flex-col lg:flex-row`}
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
