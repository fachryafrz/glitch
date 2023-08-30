"use client";

import { IonIcon } from "@ionic/react";
import * as Icons from "ionicons/icons";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function GameOverview({ game, stores }) {
  const dateRaw = new Date(game.released);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const gameDate = dateRaw.toLocaleString("en-US", options);

  const platformIcon = (platformName) => {
    switch (platformName) {
      case "PC":
        return Icons.logoWindows;
      case "PlayStation":
        return Icons.logoPlaystation;
      case "Xbox":
        return Icons.logoXbox;
      default:
        return `Icons.logo${platformName.toLowerCase()}`;
    }
  };

  const storeIcon = (storeName) => {
    switch (storeName) {
      case "Steam":
        return `https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png`;
      case "PlayStation Store":
        return `https://ww1.freelogovectors.net/wp-content/uploads/2022/01/playstation-store-logo-freelogovectors.net_.png`;
      case "Xbox Store":
        return `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Microsoft_Store.svg/1200px-Microsoft_Store.svg.png`;
      case "Xbox 360 Store":
        return `https://seeklogo.com/images/X/xbox-360-logo-CD2D4483E4-seeklogo.com.png?v=638133562380000000`;
      case "Epic Games":
        return `https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/516px-Epic_Games_logo.svg.png`;
      case "Google Play":
        return `https://static.vecteezy.com/system/resources/previews/022/613/026/original/google-play-store-icon-logo-symbol-free-png.png`;
      case "App Store":
        return `https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png`;
      case "Nintendo Store":
        return `https://cdn.iconscout.com/icon/free/png-256/free-nintendo-2296041-1912000.png?f=webp`;
      case "itch.io":
        return `https://pbs.twimg.com/profile_images/1212846124945428480/w1htiJ0v_400x400.png`;
      case "GOG":
        return `https://cdn.icon-icons.com/icons2/3053/PNG/512/gog_galaxy_alt_macos_bigsur_icon_190150.png`;
    }
  };

  const storeColor = (storeName) => {
    switch (storeName) {
      case "Steam":
        return `#000000`;
      case "PlayStation Store":
        return `#1e5ddb`;
      case "Xbox Store":
        return `#107c10`;
      case "Xbox 360 Store":
        return `#107c10`;
      default:
        return `#000000`;
    }
  };

  const ageRating = (rating) => {
    switch (rating) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/ESRB_Everyone.svg/1200px-ESRB_Everyone.svg.png";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/ESRB_Everyone_10%2B.svg/640px-ESRB_Everyone_10%2B.svg.png";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/ESRB_Teen.svg/1200px-ESRB_Teen.svg.png";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/ESRB_Mature_17%2B.svg/1200px-ESRB_Mature_17%2B.svg.png";
      case 5:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/ESRB_Adults_Only_18%2B.svg/1468px-ESRB_Adults_Only_18%2B.svg.png";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/ESRB_RP.svg/1200px-ESRB_RP.svg.png";
    }
  };

  const platformPC =
    game.platforms && game.platforms.find((i) => i.platform.id === 4);

  const minimum =
    platformPC &&
    Object.keys(platformPC.requirements).length > 0 &&
    platformPC.requirements.minimum;

  const recommended =
    platformPC &&
    Object.keys(platformPC.requirements).length > 0 &&
    platformPC.requirements.recommended;

  return (
    <div
      className={`pb-8 lg:py-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr_2px_1fr] gap-y-8 lg:gap-4`}
    >
      {/* Right */}
      <aside className={`lg:order-3`}>
        <div
          className={`sticky top-[5.5rem] flex flex-col gap-4 lg:overflow-y-auto lg:pr-4`}
        >
          {game.background_image && (
            <figure className={`aspect-video`}>
              <img src={game.background_image} alt={game.name} />
            </figure>
          )}

          <table
            className={`first:[&_td]:whitespace-nowrap [&_td]:align-top first:[&_td]:text-neutral-400 first:[&_td]:w-[110px]`}
          >
            <tbody>
              {game.publishers && game.publishers.length > 0 && (
                <tr>
                  <td>Publishers</td>
                  <td className={`line-clamp-2`}>
                    {game.publishers.map((item) => item.name).join(", ")}
                  </td>
                </tr>
              )}
              {game.developers && game.developers.length > 0 && (
                <tr>
                  <td>Developers</td>
                  <td className={`line-clamp-2`}>
                    {game.developers.map((dev) => dev.name).join(", ")}
                  </td>
                </tr>
              )}
              {game.released && game.released !== null && (
                <tr>
                  <td>Release Date</td>
                  <td className={`flex items-center gap-2`}>
                    <IonIcon
                      icon={Icons.calendarOutline}
                      className={`text-xl hidden`}
                    />
                    {gameDate}
                  </td>
                </tr>
              )}
              {game.parent_platforms && game.parent_platforms.length > 0 && (
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

                    {game.parent_platforms
                      .map((item) => item.platform.name)
                      .join(", ")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {game.genres && game.genres.length > 0 && (
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

          <img
            src={ageRating(game.esrb_rating && game.esrb_rating.id)}
            alt={game.esrb_rating && game.esrb_rating.name}
            className={`w-[75px]`}
          />

          {game.stores && game.stores.length > 0 && (
            <>
              <hr className={`opacity-20`} />

              <div className={`flex flex-col gap-1`}>
                <span>Available in</span>
                <div className={`flex items-center gap-1 flex-wrap`}>
                  {game.stores.map((store) => {
                    const storeInfo = stores.find(
                      (i) => i.store_id === store.store.id
                    );
                    if (storeInfo) {
                      return (
                        <Link
                          key={store.store.id}
                          href={storeInfo.url}
                          target={`_blank`}
                          className={`flex items-center max-w-fit p-1 rounded-lg transition-all`}
                          title={store.store.name}
                        >
                          <img
                            src={storeIcon(store.store.name)}
                            alt={store.store.name}
                            className={`h-[50px]`}
                          />
                        </Link>
                      );
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
            <div
              className={`prose prose-invert max-w-none`}
              dangerouslySetInnerHTML={{ __html: game.description }}
            ></div>
          </section>
          {platformPC && Object.keys(platformPC.requirements).length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}
