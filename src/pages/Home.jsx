import HomeFilters from "../components/HomeFilters";
import HomeSlider from "../components/HomeSlider";

export default function Home() {
  return (
    <div className={`container mx-auto p-4 px-24 flex flex-col gap-10`}>
      <HomeFilters />

      <HomeSlider />
    </div>
  );
}
