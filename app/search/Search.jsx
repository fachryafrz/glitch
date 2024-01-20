"use client";

import genres from "../json/genres.json";
import platforms from "../json/platforms.json";
import games from "../json/games.json";
import Card from "../components/Card";
import { IonIcon } from "@ionic/react";
import { close, optionsOutline, searchOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchData } from "../lib/fetchData";

export default function Search() {
  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef();

  const handleActive = () => {
    setActive(!active);
  };

  const fetchSearchGames = async () => {
    const query = searchParams.get("query");

    await fetchData({
      path: "/games",
      fields: `
        f *, cover.*;
        w cover != null;
        search "${query}";
        l 20;
      `,
    }).then((res) => setGames(res));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery === "") {
      return;
    }

    router.replace(`/search?query=${searchQuery.replace(/\s+/g, "+")}`);

    searchRef.current.blur();

    fetchSearchGames();
  };

  useEffect(() => {
    if (searchParams.get("query")) {
      setSearchQuery(searchParams.get("query"));
      fetchSearchGames();
    }
  }, [searchParams]);

  return (
    <div className={`flex flex-col gap-4 lg:flex-row`}>
      {/* <div className={`flex flex-col gap-4`}>
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
          } border-b-2 lg:border-b-0 lg:border-r-2 border-white border-opacity-10 pb-4 lg:pr-4 lg:!flex lg:flex-col gap-4 lg:gap-8 lg:sticky lg:top-20`}
        >
          <section id={`Genres`} className={`flex flex-col gap-2`}>
            <h2 className={`text-xl font-bold`}>Genres</h2>
            <ul className={`flex flex-col gap-1`}>
              {genres.map((item) => {
                return (
                  <li key={item.id}>
                    <Link
                      href={`/genres/${item.slug}`}
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
                      href={`/genres/${item.slug}`}
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
      </div> */}

      <div className={`flex flex-col gap-4 lg:py-4 w-full`}>
        <form
          onSubmit={handleSubmit}
          id="searchBar"
          className={`flex items-center gap-2 bg-primary-secondary bg-opacity-75 backdrop-blur w-full sticky top-6`}
        >
          <IonIcon
            icon={searchOutline}
            className={`text-xl pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400`}
          />

          <input
            ref={searchRef}
            onChange={(e) => setSearchQuery(e.target.value)}
            name={`search`}
            autoFocus={true}
            type="text"
            placeholder={`Search`}
            value={searchQuery}
            className={`pl-12 py-3 placeholder:text-neutral-400 bg-transparent w-full`}
          />

          {searchParams.get("query") && (
            <button
              type={`button`}
              className={`flex aspect-square absolute right-4 top-1/2 -translate-y-1/2`}
              onClick={() => {
                router.replace(`/search`);
              }}
            >
              <IonIcon icon={close} className={`text-2xl text-neutral-400`} />
            </button>
          )}
        </form>

        <ul
          className={`grid gap-2 lg:gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`}
        >
          {games.map((game) => {
            return (
              <li key={game.id}>
                <Card game={game} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
