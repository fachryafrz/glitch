import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Card({ game }) {
  const releaseDate = game.released;
  const date = new Date(releaseDate);
  const options = { year: "numeric", month: "short" };
  const formattedDate = date.toLocaleString("en-US", options);

  // const [details, setDetails] = useState();

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     axios
  //       .get(`https://api.rawg.io/api/games/${game.slug}`, {
  //         params: {
  //           key: "04f7065e0c1e49f5baeeb11ee1cde48c",
  //         },
  //       })
  //       .then((res) => setDetails(res.data));
  //   };

  //   fetchDetails();
  // }, [game]);

  // const gameCreator =
  //   details &&
  //   details.developers &&
  //   details.developers.length > 0 &&
  //   details.developers[0].name;

  return (
    <article>
      <Link href={`/games/${game.slug}`} className={`flex flex-col gap-2`}>
        <figure
          className={`aspect-cover overflow-hidden ${
            game.cover.image_id ? `bg-transparent` : `bg-black`
          }`}
        >
          {game.cover.image_id ? (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
              alt={game.name}
            />
          ) : (
            <img
              src={`logo.svg`}
              alt={game.name}
              className={`object-contain w-[100px] mx-auto`}
            />
          )}
        </figure>

        {/* <div>
          <h3
            title={game.name}
            className={`mb-1 sm:text-lg font-medium line-clamp-1`}
          >
            {game.name}
          </h3>

          <span title={gameCreator} className={`line-clamp-1 opacity-50`}>
            {gameCreator}
          </span>

          <div className={`flex items-center gap-1 text-xs sm:text-base mt-1`}>
            <span className={`opacity-50 whitespace-nowrap`}>
              {game.released !== null && formattedDate}
            </span>
            {game.released !== null &&
              game.genres &&
              game.genres.length > 0 && (
                <span className={`opacity-50`}>&bull;</span>
              )}

            {game.genres && game.genres.length > 0 && (
              <div className={`flex items-center gap-1 overflow-x-hidden`}>
                {game.genres.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className={`p-1 px-3 bg-neutral-600 bg-opacity-50 rounded-full whitespace-nowrap`}
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div> */}
      </Link>
    </article>
  );
}
