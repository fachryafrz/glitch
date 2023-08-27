import { IonIcon } from "@ionic/react";
import * as Icons from "ionicons/icons";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import gfm from "remark-gfm";

export default function GameOverview({ game }) {
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

  const minimum = game.platforms.find((platform) => platform.requirements)
    .requirements.minimum;

  const recommended = game.platforms.find((platform) => platform.requirements)
    .requirements.recommended;

  return (
    <div
      className={`py-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr_2px_1fr] gap-y-8 lg:gap-8`}
    >
      {/* Right */}
      <aside className={`lg:order-3`}>
        <div className={`sticky top-20 flex flex-col gap-4`}>
          <h2 className={`text-2xl lg:text-4xl font-bold`}>{game.name}</h2>

          <table
            className={`first:[&_td]:whitespace-nowrap first:[&_td]:pr-1 [&_td]:align-top [&_td]:text-neutral-400`}
          >
            <tbody>
              <tr>
                <td>Publishers:</td>
                <td className={`line-clamp-2`}>
                  {game.publishers.map((item) => item.name).join(", ")}
                </td>
              </tr>
              <tr>
                <td>Developers:</td>
                <td className={`line-clamp-2`}>
                  {game.developers.map((dev) => dev.name).join(", ")}
                </td>
              </tr>
            </tbody>
          </table>

          <div className={`flex items-center gap-2`}>
            <IonIcon icon={Icons.calendarOutline} className={`text-xl`} />
            {gameDate}
          </div>

          <div className="flex items-center gap-2">
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
          </div>

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
        </div>
      </aside>

      {/* Border */}
      <span
        className={`hidden lg:order-2 lg:inline border-r border-white border-opacity-10`}
      ></span>

      {/* Left */}
      <div className={`col-span-2 flex flex-col gap-8`}>
        <section className={`flex flex-col gap-4`}>
          <h2 className={`text-2xl lg:text-4xl font-bold`}>About the game</h2>
          <div
            className={`prose prose-invert max-w-none`}
            dangerouslySetInnerHTML={{ __html: game.description }}
          ></div>
        </section>

        <section className={`flex flex-col gap-4`}>
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
        </section>
      </div>
    </div>
  );
}
