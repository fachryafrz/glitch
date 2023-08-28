import { IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GameMedia from "../components/GameMedia";
import GameOverview from "../components/GameOverview";

import backdrop from "../json/gameDetailsIGDB.json";
import images from "../json/gameScreenshotsRAWG.json";
import stores from "../json/gameStoresRAWG.json";
import axios from "axios";

export default function Details() {
  let { slug } = useParams();
  let params = {
    key: import.meta.env.VITE_API_KEY,
  };

  const [game, setGame] = useState({});
  const [images, setImages] = useState([]);
  const [stores, setStores] = useState([]);

  const fetchGame = async () => {
    axios
      .get(`https://api.rawg.io/api/games/${slug}`, {
        params: {
          ...params,
        },
      })
      .then((res) => setGame(res.data));
  };

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchImages = async () => {
    axios
      .get(`https://api.rawg.io/api/games/${slug}/screenshots`, {
        params: {
          ...params,
        },
      })
      .then((res) => setImages(res.data.results));
  };

  const fetchStores = async () => {
    axios
      .get(`https://api.rawg.io/api/games/${slug}/stores`, {
        params: {
          ...params,
        },
      })
      .then((res) => setStores(res.data.results));
  };

  useEffect(() => {
    fetchGame();
    fetchImages();
    fetchStores();
  }, []);

  // console.log(game);
  // console.log(screenshots);

  return (
    <div className={`flex flex-col gap-2 md:gap-4 py-4`}>
      <div
        style={{
          background: `url(${game.background_image})`,
          backgroundSize: `contain`,
        }}
        className={`absolute aspect-video inset-0 -z-10 blur-3xl opacity-40`}
      ></div>

      <Link
        to={`/`}
        className={`flex max-w-fit items-center gap-2 text-neutral-400 hocus:gap-3 hocus:text-white transition-all`}
      >
        <IonIcon icon={chevronBackOutline} />
        <span>Back to home</span>
      </Link>

      {images.length > 0 && <GameMedia game={game} images={images} />}

      <GameOverview game={game} stores={stores} />
    </div>
  );
}
