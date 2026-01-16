import { create } from 'zustand';

// STORE DE ZUSTAND PARA MANEJAR EL ESTADO DE LOS RESULTADOS DE EVENTOS DE FORMA GLOBAL
const useEventsResults = create((set) => ({
    data: [],
    error: null,
    isLoading: false,

    fetchEvents: async (params) => {
        try {
            await set(() => ({ isLoading: true }));

            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TIKETMASTER_API_KEY}&countryCode=MX${params?.length ? params : ''}`); // Hacemos la petición a la API

            const data = await response.json(); // Convertimos la respuesta a JSON

            await set(() => ({ data, isLoading: false }));
        }
        catch (err) {
            await set(() => ({ error: err, isLoading: false }));
        }
    }
}));

export default useEventsResults;