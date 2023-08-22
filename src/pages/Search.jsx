import { Link } from "react-router-dom";
import genres from "../json/genres.json";
import platforms from "../json/platforms.json";
import games from "../json/games.json";
import Card from "../components/Card";
import { IonIcon } from "@ionic/react";
import { optionsOutline, searchOutline } from "ionicons/icons";
import { useState } from "react";

export default function Search() {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <div
      className={`md:container mx-auto px-4 xl:px-20 flex flex-col lg:flex-row`}
    >
      <div className={`flex flex-col gap-2`}>
        <button
          onClick={handleActive}
          className={`max-w-fit lg:hidden flex items-center gap-2 bg-white bg-opacity-10 hocus:bg-opacity-20 p-2 px-4 rounded-full`}
        >
          <IonIcon icon={optionsOutline} className={`text-xl`} />
          <span>Filters</span>
        </button>

        <aside
          className={`${
            active ? `grid grid-cols-2` : `hidden`
          } border-b-2 lg:border-b-0 lg:border-r-2 border-white border-opacity-10 py-4 lg:pr-4 lg:!flex lg:flex-col gap-4 lg:sticky lg:top-20`}
        >
          <section id={`Genres`} className={`flex flex-col gap-2`}>
            <h2 className={`text-xl font-bold`}>Genres</h2>
            <ul className={`flex flex-col gap-1`}>
              {genres.map((item) => {
                return (
                  <li key={item.id}>
                    <Link
                      to={`/genres/${item.slug}`}
                      className={`text-neutral-400 hocus:text-white font-light whitespace-nowrap`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id={`Platforms`} className={`flex flex-col gap-2`}>
            <h2 className={`text-xl font-bold`}>Platforms</h2>
            <ul className={`flex flex-col gap-1`}>
              {platforms.map((item) => {
                return (
                  <li key={item.id}>
                    <Link
                      to={`/genres/${item.slug}`}
                      className={`text-neutral-400 hocus:text-white font-light`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </div>

      <div className={`py-2 px-4 flex flex-col gap-4`}>
        <div
          id="searchBar"
          className={`flex items-center gap-2 px-6 bg-primary-secondary bg-opacity-75 backdrop-blur w-full sticky top-6`}
        >
          <input
            type="text"
            placeholder={`Search`}
            className={`py-3 placeholder:text-neutral-400 bg-transparent w-full`}
          />
          <button className={`flex aspect-square`}>
            <IonIcon
              icon={searchOutline}
              className={`text-xl text-neutral-400`}
            />
          </button>
        </div>

        <ul
          className={`grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4`}
        >
          {games.map((item, i) => {
            return (
              <li key={i}>
                <Card game={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
