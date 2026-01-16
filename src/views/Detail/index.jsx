import { format } from "date-fns";
import eventFetcher from "../../utils/fetchEvents";

const pathname = window.location.pathname;
const resource = eventFetcher(pathname.substring(8, pathname.length)); // 8 = "/detail/".length

const Detail = () => {
  const eventData = resource.eventDetail.read();

  const dateTime = eventData.dates?.start?.dateTime
    ? format(new Date(eventData.dates.start.dateTime), "dd/MM/yyyy HH:mm")
    : null;

  const venue = eventData._embedded?.venues?.[0];
  const genre = eventData.classifications?.[0]?.genre?.name;
  const subGenre = eventData.classifications?.[0]?.subGenre?.name;

  const price = eventData.priceRanges?.[0];
  const priceText =
    price?.min != null && price?.max != null
      ? `${price.min} - ${price.max} ${price.currency || ""}`
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* HERO */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <img
                src={eventData.images?.[0]?.url}
                alt={eventData.name}
                className="h-72 w-full object-cover sm:h-96 lg:h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

              {/* little badges */}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {genre ? (
                  <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white/90 shadow backdrop-blur">
                    {genre}
                  </span>
                ) : null}
                {subGenre ? (
                  <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white/80 shadow backdrop-blur">
                    {subGenre}
                  </span>
                ) : null}
                {dateTime ? (
                  <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white/80 shadow backdrop-blur">
                    {dateTime}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Main info */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {eventData.name}
                </h1>

                {eventData.info ? (
                  <p className="text-sm leading-relaxed text-white/70">
                    {eventData.info}
                  </p>
                ) : (
                  <p className="text-sm text-white/60">
                    Sin descripción disponible.
                  </p>
                )}

                {/* Meta */}
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-white/60">Ubicación</p>
                    <p className="mt-1 text-sm text-white/90">
                      {venue?.name ? venue.name : "—"}
                      {venue?.city?.name ? `, ${venue.city.name}` : ""}
                      {venue?.country?.name ? `, ${venue.country.name}` : ""}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-white/60">Precio</p>
                    <p className="mt-1 text-sm text-white/90">
                      {priceText || "No especificado"}
                    </p>
                  </div>
                </div>

                {eventData.pleaseNote ? (
                  <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold text-white/60">Importante</p>
                    <p className="mt-1 text-sm text-white/70">
                      {eventData.pleaseNote}
                    </p>
                  </div>
                ) : null}

                {/* CTA */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={eventData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    Comprar entradas
                  </a>

                  <a
                    href={eventData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 shadow-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    Ver en tienda oficial ↗
                  </a>
                </div>

                <p className="mt-2 text-xs text-white/45">
                  Serás redirigido a la web oficial del evento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seatmap + extra info */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Seatmap */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold">Mapa de asientos</h2>
                <span className="text-xs text-white/50">
                  {eventData.seatmap?.staticUrl ? "Disponible" : "No disponible"}
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                {eventData.seatmap?.staticUrl ? (
                  <img
                    src={eventData.seatmap.staticUrl}
                    alt="Seat Map"
                    className="w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-56 place-items-center p-6 text-center">
                    <p className="text-sm text-white/60">
                      Este evento no tiene mapa de asientos disponible.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick details */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <h3 className="text-lg font-bold">Detalles rápidos</h3>

            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white/60">Fecha</p>
                <p className="mt-1 text-sm text-white/90">{dateTime || "—"}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white/60">Clasificación</p>
                <p className="mt-1 text-sm text-white/90">
                  {genre || "—"}
                  {subGenre ? ` · ${subGenre}` : ""}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white/60">Rango de precios</p>
                <p className="mt-1 text-sm text-white/90">{priceText || "—"}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Detail;
