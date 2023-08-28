import { IonIcon } from "@ionic/react";
import axios from "axios";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";

export default function HomeSliderItem({ game }) {
  const [details, setDetails] = useState();
  const gameCreator =
    details &&
    details.developers &&
    details.developers.length > 0 &&
    details.developers[0].name;

  const fetchDetails = async () => {
    axios
      .get(`https://api.rawg.io/api/games/${game.id}`, {
        params: {
          key: import.meta.env.VITE_API_KEY,
        },
      })
      .then((res) => setDetails(res.data));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <figure className={`aspect-video lg:aspect-auto overflow-hidden`}>
        <img src={game.background_image} alt={game.name} />
      </figure>
      <div
        className={`relative lg:w-[50%] xl:w-[40%] p-8 xl:p-10 bg-primary-secondary flex flex-col gap-4 text-center lg:text-start`}
      >
        <h2
          title={game.name}
          className={`text-2xl lg:text-4xl font-bold line-clamp-2 leading-snug`}
        >
          {game.name}
        </h2>

        <div
          className={`flex items-center justify-center lg:justify-start gap-1`}
        >
          <IonIcon icon={star} className={`text-primary-yellow`} />
          <span>{game.rating.toFixed(1)}</span>
          {game.rating && game.released && <span>&bull;</span>}
          <span>{new Date(game.released).getFullYear()}</span>
          {game.released && gameCreator && (
            <span className={`hidden xs:inline`}>&bull;</span>
          )}
          <span className={`hidden xs:inline`}>{gameCreator}</span>
        </div>

        {game.genres && (
          <div
            className={`flex items-center justify-center lg:justify-start gap-1 flex-wrap`}
          >
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

        <ReactMarkdown className={`line-clamp-5 opacity-50`}>
          {details && details.description_raw}
        </ReactMarkdown>
        <div
          className={`mt-auto pt-4 flex flex-col gap-4 items-center xs:flex-row xs:items-end xs:justify-between`}
        >
          <Link
            to={`/games/${game.slug}`}
            className={`p-3 px-8 bg-white bg-opacity-10 rounded hocus:bg-opacity-20 text-center`}
          >
            View details
          </Link>
        </div>
      </div>
    </>
  );
}
