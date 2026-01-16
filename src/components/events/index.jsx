import EventItem from "./components/EventItem";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Events = ({ searchTerm, events }) => {
  const navigate = useNavigate();

  const handleEventItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const renderEvents = () => {
    let eventsFiltered = events;

    if (searchTerm.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (!eventsFiltered.length) {
      return (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-lg">
          <p className="font-semibold">No encontramos eventos.</p>
          <p className="mt-1 text-sm text-white/60">
            Probá con otro nombre o eliminá filtros.
          </p>
        </div>
      );
    }

    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventsFiltered.map((eventItem) => (
          <EventItem
            key={`event-item-${eventItem.id}`}
            id={eventItem.id}
            name={eventItem.name}
            info={eventItem.info}
            image={eventItem.images?.[0]?.url}
            onEventClick={handleEventItemClick}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Lista de eventos
        </h1>
        <p className="text-sm">
          Descubrí shows, espectáculos y más. Hacé click para ver detalles.
        </p>
      </div>

      {renderEvents()}
    </section>
  );
};

export default memo(Events);
