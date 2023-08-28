import { useEffect, useState } from "react";
import HomeFilters from "../components/HomeFilters";
import HomeSlider from "../components/HomeSlider";
import Slider from "../components/Slider";
import games from "../json/games.json";
import axios from "axios";

export default function Home() {
  const currentDate = new Date();
  const today = currentDate.toISOString().slice(0, 10);

  const tomorrow = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 2
  )
    .toISOString()
    .slice(0, 10);

  const firstDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    2
  )
    .toISOString()
    .slice(0, 10);
  const thirtyDaysAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    2
  )
    .toISOString()
    .slice(0, 10);
  const currentYear = currentDate.getFullYear();
  const endOfYear = new Date(currentYear, 11, 32).toISOString().slice(0, 10);

  return (
    <div className={`flex flex-col gap-4 lg:gap-10`}>
      <HomeFilters />

      <HomeSlider apiUrl={`games`} min={0} max={5} />

      <Slider
        title={`New games`}
        apiUrl={`games`}
        dates={`${thirtyDaysAgo},${today}`}
      />

      <Slider
        title={`Upcoming Games`}
        apiUrl={`games`}
        dates={`${tomorrow},${endOfYear}`}
        ordering={`-rating`}
      />

      <Slider title={`Popular`} apiUrl={`games`} />

      <HomeSlider apiUrl={`games`} min={5} max={10} />
    </div>
  );
}
