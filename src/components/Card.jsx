import { Link } from "react-router-dom";

export default function Card({ game }) {
  return (
    <article>
      <Link to={"/detail"} className={`flex flex-col gap-2`}>
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
