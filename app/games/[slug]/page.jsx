import React from "react";
import GameOverview from "./components/GameOverview";
import GameMedia from "./components/GameMedia";
import axios from "axios";
import Image from "next/image";

async function fetchGame(slug, path = "") {
  const res = await axios.get(`https://api.rawg.io/api/games/${slug}${path}`, {
    params: {
      key: "a38e9622914345288a1e518be755b1b7",
    },
  });

  return res.data;
}

export default async function Details({ params }) {
  const { slug } = params;

  const game = await fetchGame(slug);
  const images = await fetchGame(slug, "/screenshots");
  const stores = await fetchGame(slug, "/stores");

  return (
    <div className={`flex flex-col gap-2 md:gap-4 py-4`}>
      <figure
        className={`absolute aspect-video inset-0 -z-10 blur-3xl opacity-40`}
      >
        <Image
          src={game.background_image}
          alt={game.name}
          width={500}
          height={500}
        />
      </figure>
      {images.results.length > 0 && (
        <GameMedia game={game} images={images.results} />
      )}
      <GameOverview game={game} stores={stores.results} />
    </div>
  );
}
