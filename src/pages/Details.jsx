import { IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import GameMedia from "../components/GameMedia";
import GameOverview from "../components/GameOverview";

import backdrop from "../json/gameDetailsIGDB.json";
import game from "../json/gameDetailsRAWG.json";
import images from "../json/gameScreenshotsRAWG.json";
import stores from "../json/gameStoresRAWG.json";

export default function Details() {
  return (
    <div className={`flex flex-col gap-4 py-4`}>
      <div
        style={{
          background: `url(https://images.igdb.com/igdb/image/upload/t_original/${backdrop[0].image_id}.jpg})`,
          backgroundSize: `contain`,
        }}
        className={`absolute aspect-video inset-0 -z-10 blur-3xl opacity-30`}
      ></div>

      <Link
        to={`/`}
        className={`flex max-w-fit items-center gap-2 text-neutral-400 hocus:gap-3 hocus:text-white transition-all`}
      >
        <IonIcon icon={chevronBackOutline} />
        <span>Back to home</span>
      </Link>

      <GameMedia game={game} images={images} backdrop={backdrop[0].image_id} />

      <GameOverview game={game} stores={stores.results} />
    </div>
  );
}
