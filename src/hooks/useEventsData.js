import eventsJSON from "../data/events.json";
import { useState } from "react";

// HOOK PARA LLAMAR A LA API DE FORMA LOCAL
const useEventsData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchEvents = async (params) => {
    try {

      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TIKETMASTER_API_KEY}&countryCode=MX${params?.length ? params : ''}`); // Hacemos la petición a la API

      const data = await response.json(); // Convertimos la respuesta a JSON

      setData(data); // Guardamos los datos en el estado
      setIsLoading(false); // Indicamos que ya no estamos cargando
    }
    catch (err) {
      setError(err);
    }
  };

  // Si retornamos dos o mas elementos usamos array [], sino un objeto {}
  return {
    events: data?._embedded?.events || [],
    page: data?.page || {},
    isLoading,
    error,
    fetchEvents,
  };
};

export default useEventsData;
