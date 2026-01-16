import wrapPromise from "./wrapPromise";

// Funcion para obtener el detalle de un evento por su ID:
const fetchEventDetail = async (eventId) => {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TIKETMASTER_API_KEY}`);

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

// Funcion que envuelve la llamada a fetchEventDetail con wrapPromise:
const fetchData = (eventId) => {
    return {
        eventDetail: wrapPromise(fetchEventDetail(eventId))
    };
};

export default fetchData;