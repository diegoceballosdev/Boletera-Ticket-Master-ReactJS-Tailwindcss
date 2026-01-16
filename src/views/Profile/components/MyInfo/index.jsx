import { useForm } from "react-hook-form";
import { useEffect } from "react";

const USER_DATA = "userData";

const MyInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};
      setValue("name", userData?.name || "");
      setValue("age", userData?.age || "");
      setValue("email", userData?.email || "");
    } catch (error) {
      console.error("Error al leer los datos de localStorage", error);
    }
  }, [setValue]);

  const handleFormSubmit = (data) => {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data));
      alert("Datos guardados correctamente en localStorage");
    } catch (error) {
      alert("Error al guardar los datos en localStorage");
    }
  };

  const inputBase =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20";
  const labelBase = "text-sm font-semibold text-white/80";

  return (
    <div className="text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Mi información</h2>
        <p className="mt-1 text-sm text-white/60">
          Estos datos se guardan en tu navegador (localStorage).
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className={labelBase}>Nombre</label>
          <input
            {...register("name", { required: true, minLength: 2, maxLength: 30 })}
            className={inputBase}
            placeholder="Ej: Diego"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-200">
              El nombre es obligatorio (2 a 30 caracteres).
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={labelBase}>Email</label>
          <input
            {...register("email", { required: true })}
            className={inputBase}
            placeholder="ejemplo@mail.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-200">El email es obligatorio.</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className={labelBase}>Edad</label>
          <input
            {...register("age", {
              required: true,
              min: 1,
              max: 120,
              valueAsNumber: true,
            })}
            className={inputBase}
            type="number"
            placeholder="Ej: 25"
          />
          {errors.age && (
            <p className="mt-2 text-sm text-red-200">
              La edad es obligatoria (1 a 120).
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Guardar cambios
          </button>

          <p className="text-xs text-white/50">
            Tip: presioná <span className="font-mono">Ctrl + F5</span> si ves estilos raros.
          </p>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
