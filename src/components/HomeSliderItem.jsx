import { IonIcon } from "@ionic/react";
import axios from "axios";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";

export default function HomeSliderItem({ game }) {
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

  return (
    <>
      <figure className={`flex-1 xl:aspect-video`}>
        <img
          src={game.background_image}
          alt={game.name}
          className={`object-center`}
        />
      </figure>
      <div
        className={`relative lg:w-[40%] xl:w-[35%] p-8 xl:p-10 bg-primary-secondary flex flex-col gap-4 text-center lg:text-start`}
      >
        <h2
          title={game.name}
          className={`text-4xl xl:text-5xl font-bold line-clamp-2 leading-snug`}
        >
          {game.name}
        </h2>

        <div className={`flex items-center gap-1`}>
          <IonIcon icon={star} className={`text-primary-yellow`} />
          <span>{game.rating.toFixed(1)} &bull; </span>
          <span>{new Date(game.released).getFullYear()} &bull; </span>
          <span>{game.genres[0].name}</span>
        </div>

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
