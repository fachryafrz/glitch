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
        <figure className={`aspect-video overflow-hidden`}>
          <img src={game.background_image} alt={game.name} />
        </figure>
        <div>
          <h3 className={`mb-1 text-lg font-medium line-clamp-1`}>
            {game.name}
          </h3>
          <div className={`flex items-start gap-1`}>
            <span className={`opacity-50`}>{formattedDate}</span>
            <span className={`opacity-50`}>&bull;</span>
            <span className={`line-clamp-1`}>{gameCreator}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
