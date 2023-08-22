/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

type Game = {
  game: any;
};

export default function Card({ game }: Game) {
  return (
    <article>
      <Link to={"/"} className={`flex flex-col gap-2`}>
        <figure className={`aspect-cover`}>
          <img src={game.cover} alt={game.title} />
        </figure>
        <div>
          <h3 className={`text-lg font-medium line-clamp-1`}>{game.title}</h3>
          <span className={`text-neutral-500 line-clamp-1`}>
            {game.company}
          </span>
        </div>
      </Link>
    </article>
  );
}
