import React from "react";
import GameOverview from "./components/GameOverview";
import GameMedia from "./components/GameMedia";
import { fetchData } from "@/app/lib/fetchData";
import Grid from "@/app/components/Grid";

export async function generateMetadata({ params }) {
  const { id } = params;

  const gameData = await fetchData({
    path: `/games`,
    fields: `
    f *, screenshots.*, artworks.*, cover.*;
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
      images: `https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.name} (${gameReleaseDate}) - GameCove`,
      description: game.summary,
      creator: "@fachryafrz",
      images: `https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`,
    },
  };
}

export default async function Details({ params }) {
  const { id } = params;

  const gameData = await fetchData({
    path: `/games`,
    fields: `
    f *, screenshots.*, artworks.*, cover.*, genres.*, involved_companies.*, platforms.*, videos.*, age_ratings.*, external_games.*, similar_games.*;
    w id = ${id};
    `,
  });
  const game = gameData[0];

  const gamePublishers = game.involved_companies.filter(
    (item) => item.publisher === true && item.developer === false
  );
  const gameDevelopers = game.involved_companies.filter(
    (item) => item.developer === true
  );

  let publishers, developers;

  if (gamePublishers.length > 0) {
    publishers = await fetchData({
      path: `/companies`,
      fields: `
        fields name;
        where id = (${gamePublishers.map((item) => item.company).join(",")});
      `,
    });
  }

  if (gameDevelopers.length > 0) {
    developers = await fetchData({
      path: `/companies`,
      fields: `
        fields name;
        where id = (${gameDevelopers.map((item) => item.company).join(",")});
      `,
    });
  }

  const similarGames = await fetchData({
    path: `/games`,
    fields: `
      f *, cover.*; 
      where id = (${game.similar_games.map((item) => item.id).join(",")});
    `,
  });

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
      <GameOverview
        game={game}
        publishers={publishers}
        developers={developers}
      />

      {game.similar_games && (
        <Grid title={`Similar Games`} games={similarGames} />
      )}
    </div>
  );
}
