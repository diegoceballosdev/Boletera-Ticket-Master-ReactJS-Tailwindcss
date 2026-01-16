import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import Home from "../views/Home";
import Detail from "../views/Detail";
import Error404 from "../views/Error404";
import Profile from "../views/Profile";
import MyInfo from "../views/Profile/components/MyInfo";
import LikedEvents from "../views/Profile/components/LikedEvents";
import ErrorBoundary from "../components/ErrorBoundary";

// Definimos las rutas de la aplicacion
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    //Declarar el error aqui es suficiente para todas las rutas hijas:
    errorElement: <Error404 />,
  },
  {
    path: "/detail/:eventId", // :eventId es un parametro dinamico. y no se llama solo 'id' porque debo usar camelCase para tomar este parametro y que el componente Detail lo reconozca
    element:(
      <Suspense fallback={<div>Cargando detalle...</div>}>
        <ErrorBoundary fallback={<div>Error al cargar el detalle del evento.</div>}>
          <Detail />
        </ErrorBoundary>
      </Suspense>
      ),
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        // no es necesario el '/' al inicio porque es una ruta hija:
        path: 'my-info',
        element: <MyInfo />,
      },
      {
        path: 'liked-events',
        element: <LikedEvents />,
      }
    ]
  }
]);

// Componente que provee las rutas a la aplicacion
const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;
