import { Link } from "react-router-dom";

export default function Card(prop) {
  return (
    <article>
      <Link to={"/"} className={`flex flex-col gap-2`}>
        <figure className={`aspect-[2/3]`}>
          <img src={prop.cover} alt={prop.title} />
        </figure>
        <div>
          <h3 className={`text-lg font-medium line-clamp-1`}>{prop.title}</h3>
          <span className={`text-neutral-500`}>{prop.company}</span>
        </div>
      </Link>
    </article>
  );
}
