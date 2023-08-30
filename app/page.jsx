import axios from "axios";
import HomeFilters from "./components/HomeFilters";
import HomeSlider from "./components/HomeSlider";
import Slider from "./components/Slider";

async function fetchGames(dates, ordering, genres, stores, dev) {
  const res = await axios.get(`https://api.rawg.io/api/games`, {
    params: {
      key: "a38e9622914345288a1e518be755b1b7",
      dates: dates,
      ordering: ordering,
      genres: genres,
      stores: stores,
      developers: dev,
    },
  });

  return res.data.results;
}

async function fetchAdditional(path) {
  const res = await axios.get(`https://api.rawg.io/api/${path}`, {
    params: {
      key: "a38e9622914345288a1e518be755b1b7",
    },
  });

  return res.data.results;
}

export default async function Home() {
  const genres = await fetchAdditional(`genres`);
  const developers = await fetchAdditional(`developers`);

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
    <>
      <h1 className={`sr-only`}>{process.env.APP_NAME}</h1>

      <div className={`flex flex-col gap-4 lg:gap-10`}>
        <HomeFilters />

        <HomeSlider games={await fetchGames()} min={0} max={5} />

        <Slider
          title={`New releases`}
          games={await fetchGames(`${thirtyDaysAgo},${today}`)}
        />

        <Slider
          title={`Upcoming Games`}
          games={await fetchGames(`${tomorrow},${endOfYear}`)}
          sort={`ASC`}
        />

        <Slider title={`Popular`} games={await fetchGames()} />

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
        })}
      </div>
    </>
  );
}
