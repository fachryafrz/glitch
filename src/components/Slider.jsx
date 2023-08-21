import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import data from "../json/slider.json";
import Card from "./Card";
import { IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";

export default function Slider(prop) {
  return (
    <section name={prop.title}>
      <h2 className={`sr-only`}>{prop.title}</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={5}
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
        className={`relative py-12`}
      >
        {data.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Card
                cover={item.cover}
                title={item.title}
                company={item.company}
              />
            </SwiperSlide>
          );
        })}

        <div
          className={`absolute inset-x-0 top-0 flex items-center justify-between z-10 pointer-events-none [&_*]:pointer-events-auto text-2xl`}
        >
          <span className={`font-bold`}>{prop.title}</span>

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
