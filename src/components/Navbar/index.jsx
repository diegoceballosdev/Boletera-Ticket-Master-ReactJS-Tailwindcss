import { useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => setSearch(event.target.value);

  const handelInputKeyDown = (event) => {
    if (event.key === "Enter") onSearch(search);
  };

  useImperativeHandle(ref, () => ({
    search,
    setSearch,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white shadow">
            🎟️
          </div>
          <div className="leading-tight">
            <p className="text-base font-bold text-white">Mi boletería</p>
            <p className="text-xs text-white/60">Eventos • Entradas • Oficial</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative w-full max-w-md">
            <input
              placeholder="Busca tu evento favorito"
              onChange={handleInputChange}
              onKeyDown={handelInputKeyDown}
              value={search}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-lg outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              ⌕
            </div>
          </div>

          <Link
            to="/profile/my-info"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Perfil
          </Link>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
