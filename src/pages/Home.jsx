import HomeFilters from "../components/HomeFilters";
import HomeSlider from "../components/HomeSlider";
import Slider from "../components/Slider";
import data from "../json/games.json";

export default function Home() {
  return (
    <div
      className={`md:container mx-auto p-4 xl:px-24 flex flex-col gap-4 lg:gap-10`}
    >
      <HomeFilters />

      <HomeSlider />

      <Slider title={`New games`} games={data} min={0} max={6} />

      <Slider title={`Popular now`} games={data} min={6} max={12} />
    </div>
  );
}
