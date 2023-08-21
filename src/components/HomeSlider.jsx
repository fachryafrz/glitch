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
              <div
                className={`relative w-[30%] p-8 pt-0 bg-primary-secondary flex flex-col gap-4`}
              >
                <span
                  className={`capitalize text-sm text-neutral-400 bg-white bg-opacity-10 p-1 px-4 max-w-fit`}
                >
                  New
                </span>
                <h2 className={`text-4xl font-bold line-clamp-2 leading-snug`}>
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
                    <button id={`homePrev`}>
                      <IonIcon icon={arrowBack} />
                    </button>
                    <button id={`homeNext`}>
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
