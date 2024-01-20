import React from "react";
import GameOverview from "./components/GameOverview";
import GameMedia from "./components/GameMedia";
import axios from "axios";
import { fetchData } from "@/app/lib/fetchData";

// export async function generateMetadata({ params }) {
//   const { slug } = params;
//   const game = await fetchGame(slug);
//   const images = await fetchGame(slug, "/screenshots");
//   const stores = await fetchGame(slug, "/stores");

//   const filmReleaseDate = game.released
//     ? new Date(game.released).getFullYear()
//     : `Coming soon`;

//   return {
//     title: `${game.name} (${filmReleaseDate})`,
//     description: game.description_raw,
//     alternates: {
//       canonical: `/${`games`}/${game.slug}`,
//     },
//     openGraph: {
//       title: `${game.name} (${filmReleaseDate}) - GameCove`,
//       description: game.description_raw,
//       url: `https://gamecove.vercel.app/${`games`}/${game.slug}`,
//       siteName: `GameCove`,
//       images: game.background_image,
//       locale: "en_US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${game.name} (${filmReleaseDate}) - GameCove`,
//       description: game.description_raw,
//       creator: "@fachryafrz",
//       images: game.background_image,
//     },
//   };
// }

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
    <div className={`flex flex-col gap-2 md:gap-4 py-4`}>
      <figure
        className={`absolute aspect-video inset-0 -z-10 blur-3xl opacity-40`}
      >
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_original/${game.screenshots[0].image_id}.jpg`}
          alt={game.name}
        />
      </figure>
      {game.screenshots.length > 0 && (
        <GameMedia game={game} images={game.screenshots} />
      )}
      <GameOverview game={game} />
    </div>
  );
}
