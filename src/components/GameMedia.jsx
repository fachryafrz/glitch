import data from "../json/gameDetails.json";

export default function GameMedia({ game }) {
  return (
    <section>
      {/* Media */}
      <div
        className={`grid grid-cols-3 lg:grid-cols-5 grid-rows-2 lg:grid-rows-3 gap-2 sm:gap-4 [&_*]:h-full [&_*]:bg-neutral-600`}
      >
        <div
          className={`col-span-full lg:col-span-4 row-span-2 lg:row-span-full`}
        >
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_original/${game.artworks[0].image_id}.jpg`}
            alt={game.name}
          />
        </div>
        {game.screenshots.slice(0, 3).map((item) => {
          return (
            <div key={item.id}>
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_original/${item.image_id}.jpg`}
                alt={game.name}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
