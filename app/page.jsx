import axios from "axios";
import HomeFilters from "./components/HomeFilters";
import HomeSlider from "./components/HomeSlider";
import Slider from "./components/Slider";

async function fetchGames(dates, ordering, genres) {
  const res = await axios.get(`https://api.rawg.io/api/games`, {
    params: {
      key: "a38e9622914345288a1e518be755b1b7",
      dates: dates,
      ordering: ordering,
    },
  });

  return res.data.results;
}

export default async function Home() {
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
        />

        <Slider title={`Popular`} games={await fetchGames()} />

        <HomeSlider games={await fetchGames()} min={5} max={10} />
      </div>
    </>
  );
}
