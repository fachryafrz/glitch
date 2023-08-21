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

export default function HomeSlider() {
  return (
    <section name={`Home Slider`}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[EffectFade, Navigation]}
        effect={`fade`}
        navigation={{
          enabled: true,
          prevEl: "#prev",
          nextEl: "#next",
        }}
      >
        {data.map((item, i) => {
          return (
            <SwiperSlide key={i} className={`flex`}>
              <figure className={`flex-1`}>
                <img
                  src={item.backdrop}
                  alt={item.title}
                  className={`object-center`}
                />
              </figure>
              <div className={`w-[30%] p-8 bg-primary-secondary flex flex-col`}>
                <h2
                  className={`text-4xl mb-4 font-bold line-clamp-2 leading-snug`}
                >
                  {item.title}
                </h2>
                <p className={`line-clamp-4 opacity-50`}>{item.summary}</p>
                <div className={`mt-auto flex items-center justify-between`}>
                  <Link
                    to={`/`}
                    className={`p-3 px-8 bg-white bg-opacity-10 rounded hocus:bg-opacity-20`}
                  >
                    View details
                  </Link>
                  <div name={`navigation`} className={`text-2xl flex gap-4`}>
                    <button id={`prev`}>
                      <IonIcon icon={arrowBack} />
                    </button>
                    <button id={`next`}>
                      <IonIcon icon={arrowForward} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
