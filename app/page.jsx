export const revalidate = 3600; // revalidate at most every 1 hour

import axios from "axios";
import HomeFilters from "./components/HomeFilters";
import HomeSlider from "./components/HomeSlider";
import Slider from "./components/Slider";
import { fetchData } from "./lib/fetchData";

export default async function Home() {
  const today = Math.floor(Date.now() / 1000);

  return (
    <>
      <h1 className={`sr-only`}>{process.env.APP_NAME}</h1>

      <div className={`flex flex-col gap-4 lg:gap-10`}>
        {/* <HomeFilters /> */}

        <HomeSlider
          games={await fetchData({
            path: `/games`,
            fields: `
            fields *, cover.*, artworks.*, screenshots.*, genres.*, involved_companies.*;
            where cover != null & artworks != null & rating != null & first_release_date <= ${today};
            sort first_release_date desc;
            limit 5;
            `,
          })}
          min={0}
          max={5}
        />

        {/* <Slider
          title={`New releases`}
          games={await fetchGames(`${thirtyDaysAgo},${today}`)}
          min={0}
          max={10}
        />

        <Slider
          title={`Upcoming Games`}
          games={await fetchGames(`${tomorrow},${endOfYear}`)}
          sort={`ASC`}
          min={0}
          max={10}
        /> */}

        {/* <Slider title={`Popular`} games={await fetchGames()} />

        <HomeSlider games={await fetchGames()} min={5} max={10} />

        {developers.slice(0, 3).map(async (dev) => {
          return (
            <Slider
              key={dev.id}
              title={dev.name}
              games={await fetchGames(null, null, null, null, dev.id)}
            />
          );
        })}

        <HomeSlider games={await fetchGames()} min={10} max={15} />

        {genres.slice(0, 3).map(async (genre) => {
          return (
            <Slider
              key={genre.id}
              title={genre.name}
              games={await fetchGames(null, null, genre.id)}
            />
          );
        })} */}
      </div>
    </>
  );
}
