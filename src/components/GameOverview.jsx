import { IonIcon } from "@ionic/react";
import * as Icons from "ionicons/icons";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import gfm from "remark-gfm";

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
        return Icons.logoSteam;
      case "PlayStation Store":
        return Icons.logoPlaystation;
      case "Xbox Store":
        return Icons.logoXbox;
      default:
        return `Icons.logo${storeName.toLowerCase()}`;
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

  // const platformWithRequirements = game.platforms.find(
  //   (platform) =>
  //     platform.requirements && Object.keys(platform.requirements).length > 0
  // );

  // const minimum =
  //   platformWithRequirements && platformWithRequirements.requirements.minimum;

  // const recommended =
  //   platformWithRequirements &&
  //   platformWithRequirements.requirements.recommended;

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
              {game.publishers && (
                <tr>
                  <td>Publishers</td>
                  <td className={`line-clamp-2`}>
                    {game.publishers.map((item) => item.name).join(", ")}
                  </td>
                </tr>
              )}
              {game.developers && (
                <tr>
                  <td>Developers</td>
                  <td className={`line-clamp-2`}>
                    {game.developers.map((dev) => dev.name).join(", ")}
                  </td>
                </tr>
              )}
              {game.released && (
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
              {game.parent_platforms && (
                <tr>
                  <td>Platforms</td>
                  <td className="flex items-center gap-2">
                    {game.parent_platforms.map((item) => {
                      return (
                        <IonIcon
                          key={item.platform.id}
                          icon={platformIcon(item.platform.name)}
                          title={item.platform.name}
                          className={`text-xl`}
                        />
                      );
                    })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {game.genres && (
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

          <hr className={`opacity-20 my-4`} />

          <span>Available in</span>

          <div className={`flex items-center gap-2 flex-wrap`}>
            {game.stores &&
              game.stores.map((store) => {
                const storeInfo = stores.find(
                  (i) => i.store_id === store.store.id
                );

                if (storeInfo) {
                  return (
                    <Link
                      key={store.store.id}
                      to={storeInfo.url}
                      target={`_blank`}
                      style={{
                        backgroundColor: `${storeColor(store.store.name)}`,
                      }}
                      className={`flex items-center gap-2 max-w-fit p-2 px-3 rounded-lg hocus:!bg-white hocus:text-black transition-all`}
                    >
                      {/* <IonIcon
                        icon={storeIcon(store.store.name)}
                        className={`text-2xl`}
                      /> */}
                      {store.store.name}
                    </Link>
                  );
                }
              })}
          </div>
        </div>
      </aside>

      {/* Border */}
      <span
        className={`hidden lg:order-2 lg:inline border-r border-white border-opacity-10`}
      ></span>

      {/* Left */}
      <div className={`col-span-2 flex flex-col gap-8`}>
        <div className={`sticky top-[5.5rem]`}>
          <section className={`flex flex-col gap-4`}>
            <h2 className={`text-2xl lg:text-4xl font-bold`}>{game.name}</h2>
            <div
              className={`prose prose-invert max-w-none`}
              dangerouslySetInnerHTML={{ __html: game.description }}
            ></div>
          </section>
          {/* <section className={`flex flex-col gap-4`}>
            <h2 className={`text-2xl lg:text-4xl font-bold`}>
              System Requirements
            </h2>
            <div className={`prose prose-invert max-w-none flex flex-col`}>
              <ul
                className={`first:[&_li]:list-none first:[&_li]:font-bold first:[&_li]:text-xl`}
              >
                {minimum.split("\n").map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
              <ul
                className={`first:[&_li]:list-none first:[&_li]:font-bold first:[&_li]:text-xl`}
              >
                {recommended.split("\n").map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
}
