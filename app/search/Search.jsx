"use client";

import genres from "../json/genres.json";
import platforms from "../json/platforms.json";
import games from "../json/games.json";
import Card from "../components/Card";
import { IonIcon } from "@ionic/react";
import { optionsOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search({ error, setError }) {
  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();
  const [games, setGames] = useState([]);

  const handleActive = () => {
    setActive(!active);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();

    setSearchQuery(e.target.value);
  };

  const fetchSearchGames = async (query) => {
    let params = {
      key: "a38e9622914345288a1e518be755b1b7",
      search: query ? query : searchQuery,
    };

    axios
      .get(`https://api.rawg.io/api/games`, {
        params: {
          ...params,
        },
      })
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    router.replace(`/search?query=${searchQuery.replace(/\s+/g, "+")}`);

    fetchSearchGames();
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchSearchGames(query);
    }
  }, [query]);

  return (
    <div className={`flex flex-col gap-4 lg:flex-row`}>
      <div className={`flex flex-col gap-4`}>
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
      </div>

      <div className={`flex flex-col gap-4 lg:py-4 w-full`}>
        <form
          onSubmit={handleSubmit}
          id="searchBar"
          className={`flex items-center gap-2 px-6 bg-primary-secondary bg-opacity-75 backdrop-blur w-full sticky top-6`}
        >
          <input
            onChange={handleSearchInput}
            type="text"
            placeholder={`Search`}
            value={searchQuery}
            className={`py-3 placeholder:text-neutral-400 bg-transparent w-full`}
          />
          <button type={`submit`} className={`flex aspect-square`}>
            <IonIcon
              icon={searchOutline}
              className={`text-xl text-neutral-400`}
            />
          </button>
        </form>

        <ul className={`grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4`}>
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
