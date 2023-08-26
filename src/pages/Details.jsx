import { IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import GameMedia from "../components/GameMedia";
import data from "../json/gameDetails.json";
import GameOverview from "../components/GameOverview";

export default function Details() {
  let game = data[0];

  return (
    <div className={`flex flex-col gap-4 py-4`}>
      <div
        className={`absolute aspect-video inset-0 -z-10 blur-3xl opacity-30`}
      >
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_original/${game.artworks[0].image_id}.jpg`}
          alt={game.name}
        />
      </div>

      <Link
        to={`/`}
        className={`flex max-w-fit items-center gap-2 text-neutral-400 hocus:gap-3 hocus:text-white transition-all`}
      >
        <IonIcon icon={chevronBackOutline} />
        <span>Back to home</span>
      </Link>

      <h2 className={`text-4xl font-bold`}>{game.name}</h2>

      <GameMedia game={game} />

      <GameOverview game={game} />
    </div>
  );
}
