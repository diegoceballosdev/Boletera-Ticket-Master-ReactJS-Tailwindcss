import { useRouteError, Link } from "react-router-dom";

const Error404 = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white shadow-xl backdrop-blur">
        <p className="text-sm font-semibold text-white/60">Ups…</p>

        <h1 className="mt-2 text-5xl font-extrabold tracking-tight">
          Error {error?.status || 404}
        </h1>

        <p className="mt-4 text-sm text-white/70">
          {error?.data || "No pudimos encontrar la página que buscás."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Volver al inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
