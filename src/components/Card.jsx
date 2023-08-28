import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Card({ game }) {
  const releaseDate = game.released;
  const date = new Date(releaseDate);
  const options = { year: "numeric", month: "short" };
  const formattedDate = date.toLocaleString("en-US", options);

  const [details, setDetails] = useState();

  const fetchDetails = async () => {
    axios
      .get(`https://api.rawg.io/api/games/${game.id}`, {
        params: {
          key: "7f7cb6556d15408eaeeb7b6e52579929",
        },
      })
      .then((res) => setDetails(res.data));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const gameCreator =
    details &&
    details.developers &&
    details.developers.length > 0 &&
    details.developers[0].name;

  return (
    <article>
      <Link to={`/games/${game.slug}`} className={`flex flex-col gap-2`}>
        <figure
          className={`aspect-video overflow-hidden ${
            game.background_image ? `bg-transparent` : `bg-black`
          }`}
        >
          {game.background_image ? (
            <img src={game.background_image} alt={game.name} />
          ) : (
            <img
              src={`logo.svg`}
              alt={game.name}
              className={`object-contain w-[100px] mx-auto`}
            />
          )}
        </figure>
        <div>
          <h3
            title={game.name}
            className={`mb-1 sm:text-lg font-medium line-clamp-1`}
          >
            {game.name}
          </h3>
          <div className={`flex items-center gap-1 text-xs sm:text-base mt-1`}>
            <span className={`opacity-50 line-clamp-1 whitespace-nowrap`}>
              {formattedDate}
            </span>
            {game.released !== null &&
              details &&
              details.developers &&
              details.developers.length > 0 && (
                <span className={`opacity-50`}>&bull;</span>
              )}
            <span className={`line-clamp-1`}>{gameCreator}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
