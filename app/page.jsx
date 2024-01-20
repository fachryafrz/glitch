export const revalidate = 3600; // revalidate at most every 1 hour

import axios from "axios";
import HomeFilters from "./components/HomeFilters";
import HomeSlider from "./components/HomeSlider";
import Slider from "./components/Slider";
import { fetchData } from "./lib/fetchData";

export default async function Home() {
  const today = Math.floor(Date.now() / 1000);

  const publishers = await fetchData({
    path: `/companies`,
    fields: `
    f name;
    w country = 840 & (published >= 10 | developed >= 10);
    l 3;
    s start_date_category asc;
    `,
  });

  return (
    <>
      <h1 className={`sr-only`}>{process.env.APP_NAME}</h1>

      <div className={`flex flex-col gap-4 lg:gap-10`}>
        {/* <HomeFilters /> */}

        <HomeSlider
          games={await fetchData({
            path: `/games`,
            fields: `
            f *, artworks.*, genres.*, involved_companies.*;
            w cover != null & artworks != null & rating != null & first_release_date <= ${today} & genres = (12,31);
            s first_release_date desc;
            l 5;
            `,
          })}
        />

        <Slider
          title={`New releases`}
          games={await fetchData({
            path: `/games`,
            fields: `
            f *, cover.*;
            w cover != null & rating != null & first_release_date <= ${today} & genres = (12,31);
            s first_release_date desc;
            l 20;
            `,
          })}
        />

        <Slider
          title={`Upcoming`}
          games={await fetchData({
            path: `/games`,
            fields: `
            f *, cover.*;
            w cover != null & first_release_date > ${today} & genres = (12,31);
            s first_release_date desc;
            l 20;
            `,
          })}
        />

        <Slider
          title={`Popular`}
          games={await fetchData({
            path: `/games`,
            fields: `
            f *, cover.*;
            w cover != null & genres = (12,31);
            s total_rating_count desc;
            l 20;
            `,
          })}
        />

        <HomeSlider
          games={await fetchData({
            path: `/games`,
            fields: `
            f *, artworks.*, genres.*, involved_companies.*;
            w cover != null & artworks != null & rating != null & first_release_date <= ${today} & genres = (12,31);
            s first_release_date desc;
            l 5;
            o 5;
            `,
          })}
        />

        {publishers.map(async (item) => {
          return (
            <Slider
              key={item.id}
              title={item.name}
              games={await fetchData({
                path: `/games`,
                fields: `
                f *, cover.*;
                w cover != null & involved_companies.company = ${item.id} & parent_game = null;
                s first_release_date desc;
                l 20;
                  `,
              })}
            />
          );
        })}

        {/* {developers.slice(0, 3).map(async (dev) => {
          return (
            <Slider
              key={dev.id}
              title={dev.name}
              games={await fetchGames(null, null, null, null, dev.id)}
            />
          );
        })} */}

        {/* <HomeSlider games={await fetchGames()} min={10} max={15} /> */}

        {/* {genres.slice(0, 3).map(async (genre) => {
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
