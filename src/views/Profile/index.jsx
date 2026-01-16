import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(`/profile/${path}`);
  };

  const isMyInfo = pathname.includes("my-info");
  const isLiked = pathname.includes("liked-events");

  const baseTab =
    "cursor-pointer select-none rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none";
  const activeTab =
    "bg-white text-slate-900 shadow";
  const inactiveTab =
    "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Perfil de usuario
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Guardá tu info y revisá tus eventos favoritos.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            ← Inicio
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur">
          <span
            className={`${baseTab} ${isMyInfo ? activeTab : inactiveTab}`}
            onClick={() => handleTabClick("my-info")}
            role="button"
            tabIndex={0}
          >
            Mi información
          </span>

          <span
            className={`${baseTab} ${isLiked ? activeTab : inactiveTab}`}
            onClick={() => handleTabClick("liked-events")}
            role="button"
            tabIndex={0}
          >
            Eventos favoritos
          </span>
        </div>

        {/* Content */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
