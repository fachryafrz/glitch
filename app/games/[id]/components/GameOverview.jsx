"use client";

import { fetchData } from "@/app/lib/fetchData";
import { IonIcon } from "@ionic/react";
import {
  calendarOutline,
  chevronBackCircle,
  chevronForwardCircle,
} from "ionicons/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GameOverview({ game }) {
  const dateRaw = new Date(game.first_release_date * 1000);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const gameDate = dateRaw.toLocaleString("en-US", options);

  // const platformIcon = (platformName) => {
  //   switch (platformName) {
  //     case "PC":
  //       return Icons.logoWindows;
  //     case "PlayStation":
  //       return Icons.logoPlaystation;
  //     case "Xbox":
  //       return Icons.logoXbox;
  //     default:
  //       return `Icons.logo${platformName.toLowerCase()}`;
  //   }
  // };

  const stores = game.external_games?.filter(
    (item) =>
      item.category === 1 ||
      item.category === 5 ||
      item.category === 11 ||
      item.category === 13 ||
      item.category === 15 ||
      item.category === 26 ||
      item.category === 30 ||
      item.category === 36
  );

  const storeIcon = (storeID) => {
    switch (storeID) {
      case 1:
        return `/store_icons/steam.png`;
      case 5:
        return `/store_icons/gog.png`;
      case 11:
        return `/store_icons/microsoft-store.png`;
      case 13:
        return `/store_icons/app-store.png`;
      case 15:
        return `/store_icons/google-play-store.png`;
      case 26:
        return `/store_icons/epic-games.png`;
      case 30:
        return `/store_icons/itch-io.png`;
      case 36:
        return `/store_icons/playstation-store.png`;
      // case "Xbox 360 Store":
      //   return `/store_icons/xbox-360.png`;
      // case "Nintendo Store":
      //   return `/store_icons/nintendo-store.png`;
    }
  };

  // const storeColor = (storeName) => {
  //   switch (storeName) {
  //     case "Steam":
  //       return `#000000`;
  //     case "PlayStation Store":
  //       return `#1e5ddb`;
  //     case "Xbox Store":
  //       return `#107c10`;
  //     case "Xbox 360 Store":
  //       return `#107c10`;
  //     default:
  //       return `#000000`;
  //   }
  // };

  const ESRBCategory = game.age_ratings?.find((i) => i.category === 1);

  const ageRating = (rating) => {
    switch (rating) {
      case 8:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/ESRB_Everyone.svg/1200px-ESRB_Everyone.svg.png";
      case 9:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/ESRB_Everyone_10%2B.svg/640px-ESRB_Everyone_10%2B.svg.png";
      case 10:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/ESRB_Teen.svg/1200px-ESRB_Teen.svg.png";
      case 11:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/ESRB_Mature_17%2B.svg/1200px-ESRB_Mature_17%2B.svg.png";
      case 12:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/ESRB_Adults_Only_18%2B.svg/1468px-ESRB_Adults_Only_18%2B.svg.png";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/ESRB_RP.svg/1200px-ESRB_RP.svg.png";
    }
  };

  // const platformPC =
  //   game.platforms && game.platforms.find((i) => i.platform.id === 4);

  // const minimum =
  //   platformPC &&
  //   Object.keys(platformPC.requirements).length > 0 &&
  //   platformPC.requirements.minimum;

  // const recommended =
  //   platformPC &&
  //   Object.keys(platformPC.requirements).length > 0 &&
  //   platformPC.requirements.recommended;

  const [publishers, setPublishers] = useState();
  const [developers, setDevelopers] = useState();

  const gamePublishers = game.involved_companies.filter(
    (item) => item.publisher === true && item.developer === false
  );
  const gameDevelopers = game.involved_companies.filter(
    (item) => item.developer === true && item.publisher === false
  );

  useEffect(() => {
    if (gamePublishers.length === 0 && gameDevelopers.length === 0) return;

    const fetchCompanies = async () => {
      await fetchData({
        path: `/multiquery`,
        fields: `
        query companies "Publishers" {
          fields name;
          where id = (${gamePublishers.map((item) => item.company).join(",")});
        };
        
        query companies "Developers" {
          fields name;
          where id = (${gameDevelopers.map((item) => item.company).join(",")});
        };
        `,
      }).then((res) => {
        const publishers = res.find((i) => i.name === "Publishers");
        const developers = res.find((i) => i.name === "Developers");

        setPublishers(publishers.result);
        setDevelopers(developers.result);
      });
    };

    fetchCompanies();
  }, [game]);

  return (
    <div
      className={`pb-8 lg:py-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr_2px_1fr] gap-y-8 lg:gap-4 max-w-7xl mx-auto`}
    >
      {/* Right */}
      <aside className={`lg:order-3`}>
        <div
          className={`sticky top-[5.5rem] flex flex-col gap-4 lg:overflow-y-auto lg:pr-4`}
        >
          {game.artworks && (
            <figure className={`aspect-video`}>
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_original/${game.artworks[0].image_id}.jpg`}
                alt={game.name}
              />
            </figure>
          )}

          <table
            className={`first:[&_td]:whitespace-nowrap [&_td]:align-top first:[&_td]:text-neutral-400 first:[&_td]:w-[110px]`}
          >
            <tbody>
              {publishers?.length > 0 && (
                <tr>
                  <td>Publishers</td>
                  <td className={`line-clamp-2`}>
                    {publishers.map((item) => item.name).join(", ")}
                  </td>
                </tr>
              )}
              {developers?.length > 0 && (
                <tr>
                  <td>Developers</td>
                  <td className={`line-clamp-2`}>
                    {developers.map((dev) => dev.name).join(", ")}
                  </td>
                </tr>
              )}
              {game.first_release_date !== null && (
                <tr>
                  <td>Release Date</td>
                  <td className={`flex items-center gap-2`}>
                    {/* <IonIcon
                      icon={calendarOutline}
                      className={`text-xl hidden`}
                    /> */}
                    {gameDate}
                  </td>
                </tr>
              )}
              {game.platforms?.length > 0 && (
                <tr>
                  <td>Platforms</td>
                  <td className="flex items-center gap-2">
                    {/* {game.parent_platforms.map((item) => {
                      return (
                        <IonIcon
                          key={item.platform.id}
                          icon={platformIcon(item.platform.name)}
                          title={item.platform.name}
                          className={`text-xl`}
                        />
                      );
                    })} */}

                    {game.platforms.map((item) => item.name).join(", ")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {game.genres?.length > 0 && (
            <div className={`flex items-center gap-1 flex-wrap`}>
              {game.genres.map((genre) => {
                return (
                  <span
                    key={genre.id}
                    className={`p-1 px-3 bg-neutral-600 bg-opacity-50 rounded-full`}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
          )}

          {game.age_ratings?.length > 0 && (
            <img
              src={ageRating(ESRBCategory.rating)}
              alt={game.name}
              className={`w-[75px]`}
            />
          )}

          {stores?.length > 0 && (
            <>
              <hr className={`opacity-20`} />

              <div className={`flex flex-col gap-1`}>
                <span>Available in</span>
                <div className={`flex items-center gap-1 flex-wrap`}>
                  {stores
                    .filter(
                      (item, index, self) =>
                        index ===
                        self.findIndex((t) => t.category === item.category)
                    )
                    .map((store) => {
                      {
                        /* const storeInfo = stores.find(
                      (i) => i.store_id === store.store.id
                    );
                    if (storeInfo) { */
                      }
                      return (
                        store.url && (
                          <Link
                            key={store.category}
                            href={store.url}
                            target={`_blank`}
                            className={`flex items-center max-w-fit p-1 rounded-lg transition-all`}
                          >
                            <img
                              src={storeIcon(store.category)}
                              alt={game.name}
                              className={`h-[50px]`}
                            />
                          </Link>
                        )
                      );
                      {
                        /* } */
                      }
                    })}
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Border */}
      <span
        className={`hidden lg:order-2 lg:inline border-r border-white border-opacity-10`}
      ></span>

      {/* Left */}
      <div className={`col-span-2`}>
        <div className={`sticky top-[5.5rem] flex flex-col gap-8`}>
          <section className={`flex flex-col gap-4`}>
            <h1 className={`text-2xl lg:text-4xl font-bold`}>{game.name}</h1>

            {game.summary && (
              <>
                {/* <h2 className={`text-2xl font-bold`}>Summary</h2> */}
                <ReactMarkdown>{game.summary}</ReactMarkdown>
              </>
            )}

            {game.storyline && (
              <>
                <h2 className={`text-2xl font-bold`}>Storyline</h2>
                <ReactMarkdown>{game.storyline}</ReactMarkdown>
              </>
            )}
          </section>

          {game.videos && (
            <section id="Videos">
              <Swiper
                spaceBetween={16}
                modules={[Navigation, EffectFade]}
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
                {game.videos.map((video) => {
                  return (
                    <SwiperSlide key={video.id}>
                      <iframe
                        src={`https://youtube.com/embed/${video.video_id}?rel=0&start=0`}
                        frameborder="0"
                        className={`w-full aspect-video`}
                      ></iframe>
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
                    <IonIcon
                      icon={chevronForwardCircle}
                      className={`text-3xl`}
                    />
                  </button>
                </div>
              </Swiper>
            </section>
          )}

          {/* {platformPC && Object.keys(platformPC.requirements).length > 0 && (
            <section className={`flex flex-col gap-4`}>
              <h2 className={`text-2xl lg:text-4xl font-bold`}>
                System Requirements
              </h2>
              <div className={`prose prose-invert max-w-none flex flex-col`}>
                {minimum && (
                  <ul>
                    {minimum.split("\n").map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {recommended && (
                  <ul>
                    {recommended.split("\n").map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )} */}
        </div>
      </div>
    </div>
  );
}
