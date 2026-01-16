import { useEffect, useState } from "react";
import { LIKED_EVENTS_STORAGE_KEY } from "../../../../utils/constants";
import EventItem from "../../../../components/events/components/EventItem";
import { useNavigate } from "react-router-dom";

const LikedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventsDetails = async () => {
      try {
        setIsLoading(true);

        const likedEvents =
          JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];

        const results = [];

        for (const eventId of likedEvents) {
          const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${
              import.meta.env.VITE_TIKETMASTER_API_KEY
            }`
          );
          const data = await response.json();
          results.push(data);
        }

        setEvents(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventsDetails();
  }, []);

  const handleEventItemClick = (eventId) => {
    navigate(`/detail/${eventId}`);
  };

  if (Object.keys(error || {}).length > 0) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-100">
        <p className="text-sm">
          <span className="font-semibold">Error:</span> {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-lg">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-56 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-4/5 rounded bg-white/10" />
        </div>
        <p className="mt-6 text-sm text-white/70">Loading...</p>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-lg">
        <p className="font-semibold">Todavía no tenés favoritos.</p>
        <p className="mt-1 text-sm text-white/60">
          Volvé al inicio, elegí un evento y tocá el corazón ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventItem
          key={`liked-event-item-${event.id}-${index}`}
          id={event.id}
          name={event.name}
          info={event.info}
          image={event.images?.[0]?.url}
          onEventClick={handleEventItemClick}
        />
      ))}
    </div>
  );
};

export default LikedEvents;
