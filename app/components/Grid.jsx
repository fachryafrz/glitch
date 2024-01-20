"use client";

import React from "react";
import Card from "./Card";

export default function Grid({ games, title }) {
  return (
    <section id={title}>
      <div className={`py-2`}>
        <h2 className={`text-2xl font-bold`}>{title}</h2>
      </div>

      <ul className={`grid gap-2 grid-cols-7`}>
        {games.map((game) => {
          return <Card game={game} />;
        })}
      </ul>
    </section>
  );
}
