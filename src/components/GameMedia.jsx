export default function GameMedia({ game, images, backdrop }) {
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
            src={`https://images.igdb.com/igdb/image/upload/t_original/${backdrop}.jpg`}
            alt={game.name}
          />
        </div>
        {images.slice(0, 3).map((img) => {
          return (
            <div key={img.id}>
              <img src={img.image} alt={game.name} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
