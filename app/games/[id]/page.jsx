import React from "react";
import GameOverview from "./components/GameOverview";
import GameMedia from "./components/GameMedia";
import axios from "axios";
import { fetchData } from "@/app/lib/fetchData";

export async function generateMetadata({ params }) {
  const { id } = params;

  const gameData = await fetchData({
    path: `/games`,
    fields: `
    f *, screenshots.*, artworks.*, cover.*, genres.*, involved_companies.*, platforms.*, videos.*, age_ratings.*, external_games.*;
    w id = ${id};
    `,
  });
  const game = gameData[0];

  const gameReleaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).getFullYear()
    : `Coming soon`;

  return {
    title: `${game.name} (${gameReleaseDate})`,
    description: game.summary,
    alternates: {
      canonical: `/games/${game.id}`,
    },
    openGraph: {
      title: `${game.name} (${gameReleaseDate}) - GameCove`,
      description: game.summary,
      url: `https://gamecove.vercel.app/games/${game.id}`,
      siteName: `GameCove`,
      images: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.name} (${gameReleaseDate}) - GameCove`,
      description: game.summary,
      creator: "@fachryafrz",
      images: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
    },
  };
}

export default async function Details({ params }) {
  const { id } = params;

  const gameData = await fetchData({
    path: `/games`,
    fields: `
    f *, screenshots.*, artworks.*, cover.*, genres.*, involved_companies.*, platforms.*, videos.*, age_ratings.*, external_games.*;
    w id = ${id};
    `,
  });
  const game = gameData[0];

  return (
    <div className={`flex flex-col gap-2 md:gap-4`}>
      {game.screenshots && (
        <figure
          className={`absolute aspect-video inset-0 -z-10 blur-3xl opacity-40`}
        >
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_original/${game.screenshots[0].image_id}.jpg`}
            alt={game.name}
          />
        </figure>
      )}
      {game.screenshots && <GameMedia game={game} images={game.screenshots} />}
      <GameOverview game={game} />
    </div>
  );
}
