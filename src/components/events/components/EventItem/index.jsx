import useLikeEvents from "../../../../hooks/useLikeEvents";
import HeartFilled from "../../../../assets/filled.png";
import HeartUnfilled from "../../../../assets/unfilled.jpg";

const EventItem = ({ id, info, name, image, onEventClick }) => {
  const { isEventLiked, toggleEventLike } = useLikeEvents(id);

  const handleSeeMoreClick = (evt) => {
    evt.stopPropagation();
    onEventClick(id);
  };

  const handleHeartClick = (evt) => {
    evt.stopPropagation();
    toggleEventLike();
  };

  return (
    <article
      onClick={() => onEventClick(id)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <button
          onClick={handleHeartClick}
          aria-label={isEventLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
          className="absolute right-5 top-5 rounded-full border border-white/10"
        >
          <img
            src={isEventLiked ? HeartFilled : HeartUnfilled}
            alt=""
            className="h-6 w-6 rounded-full object-cover"
          />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16" />
      </div>

      <div className="p-5">
        <h4 className="line-clamp-2 text-lg font-bold tracking-tight">
          {name}
        </h4>

        <p className="mt-2 line-clamp-3 text-sm text-white/70">
          {info || "Sin descripción disponible."}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={handleSeeMoreClick}
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition border border-gray-300 hover:bg-gray-100"
          >
            Ver más
          </button>

          <span className="text-xs text-white/50">
            ID: <span className="font-mono">{id}</span>
          </span>
        </div>
      </div>
    </article>
  );
};

export default EventItem;
