import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Events from "../../components/events";
import useEventsResults from "../../state/events-results";
import ReactPaginate from "react-paginate";

const Home = () => {
  const { data, isLoading, error, fetchEvents } = useEventsResults();
  const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
  const page = useMemo(() => data?.page || {}, [data?.page]);

  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef();
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
  };

  const handlePageClick = useCallback(
    ({ selected }) => {
      fetchEvents(`&page=${selected + 1}&keyword=${searchTerm}`);
    },
    [searchTerm, fetchEvents]
  );

  const renderEvents = () => {
    if (isLoading) {
      return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-12">
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-lg backdrop-blur">
            <div className="animate-pulse space-y-3">
              <div className="h-6 w-56 rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-4/5 rounded bg-white/10" />
            </div>
            <p className="mt-6 text-sm text-white/70">Cargando eventos...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-12">
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-100 shadow-lg">
            <p className="text-sm">
              <span className="font-semibold">Error al cargar los eventos:</span>{" "}
              {error.message}
            </p>
            <button
              onClick={() => fetchEvents(`&keyword=${searchTerm}`)}
              className="mt-4 inline-flex items-center justify-center rounded-xl border border-red-300/30 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-300/50"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-white">
            <p className="text-sm text-white/70">Búsqueda actual</p>
            <p className="font-semibold">
              {searchTerm?.trim()?.length ? searchTerm : "Todos los eventos"}
            </p>
          </div>

          {/* tu toggle (solo lo embellezco) */}
          <button
            onClick={() => setIsToggle(!isToggle)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/30 ${
              isToggle
                ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/20 hover:bg-emerald-500/25"
                : "bg-white/10 text-white/80 border border-white/10 hover:bg-white/15"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isToggle ? "bg-emerald-400" : "bg-white/40"
              }`}
            />
            {isToggle ? "on" : "off"}
          </button>
        </div>

        <div className="mt-6">
          <Events searchTerm={searchTerm} events={events} />
        </div>

        {/* Paginación */}
        <div className="mt-10 flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={page?.totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white shadow-lg backdrop-blur"
            pageClassName="select-none"
            pageLinkClassName="inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            activeLinkClassName="bg-white/15 text-white"
            previousClassName="select-none"
            previousLinkClassName="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            nextClassName="select-none"
            nextLinkClassName="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            disabledLinkClassName="opacity-40 hover:bg-white/5 cursor-not-allowed"
            breakClassName="select-none"
            breakLinkClassName="inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-semibold text-white/50"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to- from-slate-950 via-slate-900 to-slate-950">
      <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
      {renderEvents()}
    </div>
  );
};

export default Home;
