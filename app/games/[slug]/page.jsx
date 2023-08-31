import React from "react";
import GameOverview from "./components/GameOverview";
import GameMedia from "./components/GameMedia";
import axios from "axios";

async function fetchGame(slug, path = "") {
  const res = await axios.get(`https://api.rawg.io/api/games/${slug}${path}`, {
    params: {
      key: "04f7065e0c1e49f5baeeb11ee1cde48c",
    },
  });

  return res.data;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const game = await fetchGame(slug);
  const images = await fetchGame(slug, "/screenshots");
  const stores = await fetchGame(slug, "/stores");

  const filmReleaseDate = game.released
    ? new Date(game.released).getFullYear()
    : `Coming soon`;

  return {
    title: `${game.name} (${filmReleaseDate})`,
    description: game.description_raw,
    alternates: {
      canonical: `/${`games`}/${game.slug}`,
    },
    openGraph: {
      title: `${game.name} (${filmReleaseDate}) - GameCove`,
      description: game.description_raw,
      url: `https://gamecove.vercel.app/${`games`}/${game.slug}`,
      siteName: `GameCove`,
      images: game.background_image,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.name} (${filmReleaseDate}) - GameCove`,
      description: game.description_raw,
      creator: "@fachryafrz",
      images: game.background_image,
    },
  };
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
        <img src={game.background_image} alt={game.name} />
      </figure>
      {images.results.length > 0 && (
        <GameMedia game={game} images={images.results} />
      )}
      <GameOverview game={game} stores={stores.results} />
    </div>
  );
}
