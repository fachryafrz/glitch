"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  FreeMode,
  Mousewheel,
  Navigation,
  Thumbs,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { IonIcon } from "@ionic/react";
import {
  chevronBackCircle,
  chevronBackOutline,
  chevronForwardCircle,
  chevronForwardOutline,
} from "ionicons/icons";
import { useRouter } from "next/navigation";

export default function GameMedia({ game, images, backdrop }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isThumbsReady, setIsThumbsReady] = useState(false);

  useEffect(() => {
    if (thumbsSwiper) {
      setIsThumbsReady(true);
    }
  }, [thumbsSwiper]);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section>
      {/* <button
        onClick={handleGoBack}
        className={`flex max-w-fit items-center gap-2 text-neutral-400 hocus:gap-3 hocus:text-white transition-all mb-4`}
      >
        <IonIcon icon={chevronBackOutline} />
        <span>Back to previous page</span>
      </button> */}

      {/* Media */}
      <div
        className={`flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-3 gap-2 lg:gap-4 [&_*]:h-full max-w-7xl mx-auto`}
      >
        {/* Big Image */}
        <div className={`lg:col-span-4 lg:row-span-full`}>
          <Swiper
            spaceBetween={16}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper,
            }}
            modules={[FreeMode, Navigation, Thumbs, EffectFade, Autoplay]}
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              enabled: true,
              prevEl: `#prevBig`,
              nextEl: `#nextBig`,
            }}
            effect={`fade`}
          >
            {images.map((img) => {
              return (
                <SwiperSlide key={img.id}>
                  <figure className={`max-w-full aspect-video bg-black`}>
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_original/${img.image_id}.jpg`}
                      alt={game.name}
                      className={`object-contain`}
                    />
                  </figure>
                </SwiperSlide>
              );
            })}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-between pointer-events-none`}
            >
              <button
                id="prevBig"
                className={`!pointer-events-auto text-white px-4`}
              >
                <IonIcon icon={chevronBackCircle} className={`text-3xl`} />
              </button>
              <button
                id="nextBig"
                className={`!pointer-events-auto text-white px-4`}
              >
                <IonIcon icon={chevronForwardCircle} className={`text-3xl`} />
              </button>
            </div>
          </Swiper>
        </div>

        {/* Image List */}
        <div className={`row-span-full`}>
          <Swiper
            onSwiper={setThumbsSwiper}
            direction={`horizontal`}
            spaceBetween={8}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
            mousewheel={true}
            freeMode={false}
            breakpoints={{
              768: {
                spaceBetween: 16,
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              1024: {
                direction: `vertical`,
                spaceBetween: 16,
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            }}
            wrapperClass={`max-h-[300px]`}
          >
            {images.map((img) => {
              return (
                <SwiperSlide
                  key={img.id}
                  className={`cursor-pointer hocus:opacity-50`}
                >
                  <figure className={`max-w-full`}>
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${img.image_id}.jpg`}
                      alt={game.name}
                    />
                  </figure>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
