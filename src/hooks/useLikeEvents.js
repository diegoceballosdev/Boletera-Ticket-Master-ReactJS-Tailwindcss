import {useState} from "react";
import { LIKED_EVENTS_STORAGE_KEY } from "../utils/constants";

const ckeckIsEventLiked = (eventId) => {
    const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || []; // obtener los eventos likeados del localStorage
    return likedEvents.includes(eventId); // verificar si el evento actual esta en la lista de likeados
}

const useLikeEvents = (eventId) => {
    const [isEventLiked, setIsEventLiked] = useState(ckeckIsEventLiked(eventId));

    const toggleEventLike = () => {
        const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
        const eventIndex = likedEvents.indexOf(eventId); // el metodo indexOf devuelve el indice del elemento en el array, o -1 si no lo encuentra

        if (eventIndex !== -1) { // SI YA ESTA LIKEADO, LO SACAMOS
            likedEvents.splice(eventIndex, 1); // el metodo splice elimina elementos de un array y devuelve el array modificado
            setIsEventLiked(false);
        } else {
            likedEvents.push(eventId); // push agrega un elemento al final del array
            setIsEventLiked(true);
        }

        localStorage.setItem(LIKED_EVENTS_STORAGE_KEY, JSON.stringify(likedEvents)); // guardamos el array modificado en el localStorage
    };

    return {
        isEventLiked,
        toggleEventLike,
    };

};

export default useLikeEvents;